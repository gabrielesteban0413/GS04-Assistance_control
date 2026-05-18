// src/services/admin.service.ts

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

export const getDashboardStats = async (): Promise<Stat[]> => {
  // Simular llamada API
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { title: 'TOTAL EMPLEADOS', value: 142, trend: 'up', trendValue: '+3 este mes' },
    { title: 'PRESENTES HOY', value: 118, subtitle: '83% de asistencia' },
    { title: 'LLEGADAS TARDE', value: 9, trend: 'up', trendValue: '+2 vs ayer' },
    { title: 'AUSENCIAS HOY', value: 15, subtitle: '+5 sin justificar', subtitleColor: '#d32f2f' },
  ];
};

export const getRecentAttendance = async (): Promise<AttendanceRecord[]> => {
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
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', reason: 'Vacaciones - 5 días', date: '15 mar 2026' },
    { id: '2', employeeName: 'Jorge Paredes', reason: 'Cambio de turno con R. Gil', date: '10 mar 2026' },
    { id: '3', employeeName: 'Karen Torres', reason: 'Permiso médico - 1 día', date: '7 mar 2026' },
  ];
};



export interface ChartData {
  date: string;
  asistencias: number;
  ausencias: number;
}

export const getAttendanceChartData = async (): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { date: 'Lun', asistencias: 42, ausencias: 8 },
    { date: 'Mar', asistencias: 45, ausencias: 5 },
    { date: 'Mié', asistencias: 38, ausencias: 12 },
    { date: 'Jue', asistencias: 47, ausencias: 3 },
    { date: 'Vie', asistencias: 40, ausencias: 10 },
  ];
};



export interface PieData {
  name: string;        // Nombre del segmento
  value: number;       // Valor numérico
  children?: PieData[]; // Sub-segmentos para el segundo nivel
}


export const getRetirementData = async (): Promise<PieData[]> => {
  // Simular un pequeño retraso de red
  await new Promise(resolve => setTimeout(resolve, 300));

  // Datos de ejemplo para el gráfico de dos niveles
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



// ========== ASISTENCIA ==========
export interface AttendanceRecordDetail {
  id: string;
  employeeName: string;
  date: string;
  entryTime: string;
  exitTime: string;
  hoursWorked: string;
  status: 'Completo' | 'Retardo' | 'Falta' | 'Permiso';
}

export const getAttendanceRecords = async (): Promise<AttendanceRecordDetail[]> => {
  // Simular llamada API
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', date: '24/04/2026', entryTime: '08:02', exitTime: '17:05', hoursWorked: '8h 3m', status: 'Completo' },
    { id: '2', employeeName: 'Jorge Paredes', date: '24/04/2026', entryTime: '08:47', exitTime: '17:00', hoursWorked: '8h 13m', status: 'Retardo' },
    { id: '3', employeeName: 'Ana Morales', date: '24/04/2026', entryTime: '07:55', exitTime: '17:00', hoursWorked: '8h 5m', status: 'Completo' },
    { id: '4', employeeName: 'Roberto Gil', date: '24/04/2026', entryTime: '—', exitTime: '—', hoursWorked: '0h', status: 'Falta' },
    { id: '5', employeeName: 'Karen Torres', date: '24/04/2026', entryTime: '08:00', exitTime: '12:00', hoursWorked: '4h', status: 'Permiso' },
  ];
};



// ========== SOLICITUDES ==========
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

export const getLeaveRequests = async (): Promise<LeaveRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: '1', employeeName: 'Laura Mendoza', type: 'Vacaciones', startDate: '15/05/2026', endDate: '25/05/2026', reason: 'Viaje familiar', status: 'Pendiente', requestedDate: '01/05/2026' },
    { id: '2', employeeName: 'Jorge Paredes', type: 'Cambio de turno', startDate: '20/05/2026', endDate: '20/05/2026', reason: 'Cita médica', status: 'Pendiente', requestedDate: '10/05/2026' },
    { id: '3', employeeName: 'Ana Morales', type: 'Permiso médico', startDate: '10/05/2026', endDate: '12/05/2026', reason: 'Cirugía menor', status: 'Aprobada', requestedDate: '28/04/2026' },
    { id: '4', employeeName: 'Roberto Gil', type: 'Estudio', startDate: '01/06/2026', endDate: '30/06/2026', reason: 'Curso de especialización', status: 'Pendiente', requestedDate: '15/05/2026' },
    { id: '5', employeeName: 'Karen Torres', type: 'Vacaciones', startDate: '01/06/2026', endDate: '07/06/2026', reason: 'Descanso', status: 'Aprobada', requestedDate: '10/05/2026' },
  ];
};


// ========== EMPLEADOS ==========
export interface Employee {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  departamento: string;
  estado: 'activo' | 'inactivo';
}

export type EmployeeInput = Omit<Employee, 'id'>;

// Datos mock iniciales
let mockEmployees: Employee[] = [
  { id: '1', nombre: 'Laura Mendoza', documento: '12345678', email: 'laura@empresa.com', departamento: 'Finanzas', estado: 'activo' },
  { id: '2', nombre: 'Jorge Paredes', documento: '87654321', email: 'jorge@empresa.com', departamento: 'Sistemas', estado: 'activo' },
  { id: '3', nombre: 'Ana Morales', documento: '11223344', email: 'ana@empresa.com', departamento: 'RRHH', estado: 'activo' },
  { id: '4', nombre: 'Roberto Gil', documento: '44332211', email: 'roberto@empresa.com', departamento: 'Ventas', estado: 'inactivo' },
  { id: '5', nombre: 'Karen Torres', documento: '55667788', email: 'karen@empresa.com', departamento: 'Logística', estado: 'activo' },
];

// Obtener todos los empleados
export const getEmployees = async (): Promise<Employee[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockEmployees];
};

// Crear empleado
export const createEmployee = async (data: EmployeeInput): Promise<Employee> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEmployee: Employee = {
    id: String(Date.now()),
    ...data,
  };
  mockEmployees.push(newEmployee);
  return newEmployee;
};

// Actualizar empleado
export const updateEmployee = async (id: string, data: EmployeeInput): Promise<Employee> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index === -1) throw new Error('Empleado no encontrado');
  const updatedEmployee = { ...mockEmployees[index], ...data };
  mockEmployees[index] = updatedEmployee;
  return updatedEmployee;
};

// Eliminar empleado
export const deleteEmployee = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockEmployees = mockEmployees.filter(emp => emp.id !== id);
};