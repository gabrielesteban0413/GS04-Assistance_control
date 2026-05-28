// src/services/admin.service.ts
import { supabase } from '../lib/supabase';

// ========== INTERFACES EXISTENTES (no se modifican) ==========
export interface Stat {
  title: string;
  value: number | string;
  subtitle?: string;
  subtitleColor?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  entryTime?: string;
  exitTime?: string;
  shift: string;
  status: 'Puntual' | 'Retardo' | 'Ausente' | 'Permiso';
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

export interface PendingRequest {
  id: string;
  employeeName: string;
  reason: string;
  date: string;
}

export interface ChartData {
  date: string;
  asistencias: number;
  ausencias: number;
}

export interface PieData {
  name: string;
  value: number;
  children?: PieData[];
}

export interface AttendanceRecordDetail {
  id: string;
  employeeName: string;
  date: string;
  entryTime: string;
  exitTime: string;
  hoursWorked: string;
  status: 'Completo' | 'Retardo' | 'Falta' | 'Permiso';
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: 'Vacaciones' | 'Permiso médico' | 'Cambio de turno' | 'Estudio' | 'Otro';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  requestedDate: string;
}

export interface Employee {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  email: string;
  departamento: string;
  rol: string;
  activo: boolean;
}

export type EmployeeInput = Omit<Employee, 'id'>;

// ========== ESTADÍSTICAS DEL DASHBOARD (con datos reales de usuario) ==========
export const getDashboardStats = async (): Promise<Stat[]> => {
  // Total de empleados activos
  const { count: totalActivos, error: errorActivos } = await supabase
    .from('usuario')
    .select('*', { count: 'exact', head: true })
    .eq('activo', true);

  if (errorActivos) console.error('Error obteniendo total activos:', errorActivos);

  // Total de inactivos (opcional, para el trend)
  const { count: totalInactivos } = await supabase
    .from('usuario')
    .select('*', { count: 'exact', head: true })
    .eq('activo', false);

  // Los siguientes datos (presentes, retardos, ausencias) requieren tabla "asistencia"
  // Se mantienen como mock hasta que exista
  console.warn('getDashboardStats: presentes, retardos y ausencias son datos mock. Crea la tabla "asistencia" para obtener valores reales.');

  return [
    {
      title: 'TOTAL EMPLEADOS',
      value: totalActivos ?? 0,
      trend: 'up',
      trendValue: `+${totalInactivos ?? 0} inactivos`,
    },
    {
      title: 'PRESENTES HOY',
      value: 118,
      subtitle: '83% de asistencia',
    },
    {
      title: 'LLEGADAS TARDE',
      value: 9,
      trend: 'up',
      trendValue: '+2 vs ayer',
    },
    {
      title: 'AUSENCIAS HOY',
      value: 15,
      subtitle: '+5 sin justificar',
      subtitleColor: '#d32f2f',
    },
  ];
};

// ========== EMPLEADOS (CRUD real con Supabase) ==========
export const getEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase
    .from('usuario')
    .select('id_usuario, nombre, apellido, email, identificacion, departamento, rol, activo')
    .order('nombre');

  if (error) throw new Error(error.message);

  return data.map((user: any) => ({
    id: user.id_usuario.toString(),
    nombre: user.nombre,
    apellido: user.apellido,
    documento: user.identificacion,
    email: user.email,
    departamento: user.departamento?.toString() || '',
    rol: user.rol,
    activo: user.activo,
  }));
};

export const createEmployee = async (data: EmployeeInput): Promise<Employee> => {
  const { data: newUser, error } = await supabase
    .from('usuario')
    .insert({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      identificacion: data.documento,
      departamento: data.departamento ? Number(data.departamento) : null,
      rol: data.rol,
      activo: data.activo,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: newUser.id_usuario.toString(),
    nombre: newUser.nombre,
    apellido: newUser.apellido,
    documento: newUser.identificacion,
    email: newUser.email,
    departamento: newUser.departamento?.toString() || '',
    rol: newUser.rol,
    activo: newUser.activo,
  };
};

export const updateEmployee = async (id: string, data: EmployeeInput): Promise<Employee> => {
  const { data: updated, error } = await supabase
    .from('usuario')
    .update({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      identificacion: data.documento,
      departamento: data.departamento ? Number(data.departamento) : null,
      rol: data.rol,
      activo: data.activo,
    })
    .eq('id_usuario', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: updated.id_usuario.toString(),
    nombre: updated.nombre,
    apellido: updated.apellido,
    documento: updated.identificacion,
    email: updated.email,
    departamento: updated.departamento?.toString() || '',
    rol: updated.rol,
    activo: updated.activo,
  };
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const { error } = await supabase.from('usuario').delete().eq('id_usuario', id);
  if (error) throw new Error(error.message);
};

// ========== FUNCIONES MOCK (para futuras tablas) ==========
export const getRecentAttendance = async (): Promise<AttendanceRecord[]> => {
  console.warn('getRecentAttendance: datos mock. Crea la tabla "asistencia" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza Finanzas', entryTime: '08:02', shift: '08:00–17:00', status: 'Puntual' },
    { id: '2', employeeName: 'Jorge Paredes Sistemas', entryTime: '08:47', shift: '08:00–17:00', status: 'Retardo' },
    { id: '3', employeeName: 'Ana Morales RRHH', entryTime: '07:55', shift: '08:00–17:00', status: 'Puntual' },
    { id: '4', employeeName: 'Roberto Gil Ventas', shift: '08:00–17:00', status: 'Ausente' },
    { id: '5', employeeName: 'Karen Torres Logística', entryTime: '08:00', shift: '08:00–17:00', status: 'Permiso' },
  ];
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  console.warn('getRecentActivity: datos mock. Crea la tabla "actividad" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', description: 'Ana Morales registró entrada', timestamp: 'Hoy, 07:55 AM' },
    { id: '2', description: 'Admin aprobó permiso de K. Torres', timestamp: 'Hoy, 08:30 AM' },
    { id: '3', description: 'Jorge Paredes registró entrada con retardo', timestamp: 'Hoy, 05:12 PM' },
    { id: '4', description: 'RRHH modificó horario de Ventas', timestamp: 'Hoy, 05:12 PM' },
    { id: '5', description: 'Roberto Gil marcado como ausente', timestamp: 'Hoy, 07:55 AM' },
  ];
};

export const getPendingRequests = async (): Promise<PendingRequest[]> => {
  console.warn('getPendingRequests: datos mock. Crea la tabla "solicitudes" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', reason: 'Vacaciones - 5 días', date: '15 mar 2026' },
    { id: '2', employeeName: 'Jorge Paredes', reason: 'Cambio de turno con R. Gil', date: '10 mar 2026' },
    { id: '3', employeeName: 'Karen Torres', reason: 'Permiso médico - 1 día', date: '7 mar 2026' },
  ];
};

export const getAttendanceChartData = async (): Promise<ChartData[]> => {
  console.warn('getAttendanceChartData: datos mock. Crea la tabla "asistencia" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { date: 'Lun', asistencias: 42, ausencias: 8 },
    { date: 'Mar', asistencias: 45, ausencias: 5 },
    { date: 'Mié', asistencias: 38, ausencias: 12 },
    { date: 'Jue', asistencias: 47, ausencias: 3 },
    { date: 'Vie', asistencias: 40, ausencias: 10 },
  ];
};

export const getRetirementData = async (): Promise<PieData[]> => {
  console.warn('getRetirementData: datos mock. Crea la tabla "retiros" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    {
      name: 'Renuncias Voluntarias',
      value: 30,
      children: [
        { name: 'Mejor Oferta', value: 15 },
        { name: 'Cambio de Ciudad', value: 8 },
        { name: 'Emprendimiento', value: 5 },
        { name: 'Estudios', value: 2 },
      ],
    },
    {
      name: 'Despidos',
      value: 12,
      children: [
        { name: 'Bajo Rendimiento', value: 7 },
        { name: 'Reestructuración', value: 3 },
        { name: 'Falta de Adaptación', value: 2 },
      ],
    },
    {
      name: 'Jubilación',
      value: 5,
      children: [
        { name: 'Por Edad', value: 4 },
        { name: 'Anticipada', value: 1 },
      ],
    },
    {
      name: 'Fin de Contrato',
      value: 3,
      children: [
        { name: 'Obra Determinada', value: 2 },
        { name: 'Plazo Fijo', value: 1 },
      ],
    },
  ];
};

export const getAttendanceRecords = async (): Promise<AttendanceRecordDetail[]> => {
  console.warn('getAttendanceRecords: datos mock. Crea la tabla "asistencia" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', date: '24/04/2026', entryTime: '08:02', exitTime: '17:05', hoursWorked: '8h 3m', status: 'Completo' },
    { id: '2', employeeName: 'Jorge Paredes', date: '24/04/2026', entryTime: '08:47', exitTime: '17:00', hoursWorked: '8h 13m', status: 'Retardo' },
    { id: '3', employeeName: 'Ana Morales', date: '24/04/2026', entryTime: '07:55', exitTime: '17:00', hoursWorked: '8h 5m', status: 'Completo' },
    { id: '4', employeeName: 'Roberto Gil', date: '24/04/2026', entryTime: '—', exitTime: '—', hoursWorked: '0h', status: 'Falta' },
    { id: '5', employeeName: 'Karen Torres', date: '24/04/2026', entryTime: '08:00', exitTime: '12:00', hoursWorked: '4h', status: 'Permiso' },
  ];
};

export const getLeaveRequests = async (): Promise<LeaveRequest[]> => {
  console.warn('getLeaveRequests: datos mock. Crea la tabla "solicitudes" para datos reales.');
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', type: 'Vacaciones', startDate: '15/05/2026', endDate: '25/05/2026', reason: 'Viaje familiar', status: 'Pendiente', requestedDate: '01/05/2026' },
    { id: '2', employeeName: 'Jorge Paredes', type: 'Cambio de turno', startDate: '20/05/2026', endDate: '20/05/2026', reason: 'Cita médica', status: 'Pendiente', requestedDate: '10/05/2026' },
    { id: '3', employeeName: 'Ana Morales', type: 'Permiso médico', startDate: '10/05/2026', endDate: '12/05/2026', reason: 'Cirugía menor', status: 'Aprobada', requestedDate: '28/04/2026' },
    { id: '4', employeeName: 'Roberto Gil', type: 'Estudio', startDate: '01/06/2026', endDate: '30/06/2026', reason: 'Curso de especialización', status: 'Pendiente', requestedDate: '15/05/2026' },
    { id: '5', employeeName: 'Karen Torres', type: 'Vacaciones', startDate: '01/06/2026', endDate: '07/06/2026', reason: 'Descanso', status: 'Aprobada', requestedDate: '10/05/2026' },
  ];
};