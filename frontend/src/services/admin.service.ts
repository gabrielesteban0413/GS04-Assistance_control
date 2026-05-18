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