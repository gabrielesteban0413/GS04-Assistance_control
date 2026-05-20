import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/rrhh/StatCard';
import { HorarioCard } from '@/components/rrhh/HorarioCard';
import { DeptProgress } from '@/components/rrhh/DeptProgress';

// Datos mock (reemplazar después con servicios)
const attendanceRows = [
  { name: 'Laura Mendoza', turno: '08:00 - 17:00', entrada: '08:02', salida: '--', estado: 'PUNTUAL', color: 'text-green-600' },
  { name: 'Jorge Paredes', turno: '08:00 - 17:00', entrada: '08:47', salida: '--', estado: 'RETARDO', color: 'text-yellow-600' },
  { name: 'Ana Morales', turno: '08:00 - 17:00', entrada: '07:55', salida: '--', estado: 'PUNTUAL', color: 'text-green-600' },
  { name: 'Karen Torres', turno: '08:00 - 17:00', entrada: '--', salida: '--', estado: 'AUSENTE', color: 'text-red-600' },
];

const horarios = [
  { title: 'Jornada Estándar', schedule: 'Lun-Vie: 08:00 - 17:00 hrs', count: 98 },
  { title: 'Turno Tarde', schedule: 'Lun-Vie: 14:00 - 22:00 hrs', count: 24 },
];

const deptos = [
  { name: 'Finanzas', percentage: 95 },
  { name: 'Sistemas', percentage: 80 },
  { name: 'Ventas', percentage: 72 },
  { name: 'Logística', percentage: 88 },
  { name: 'RRHH', percentage: 100 },
  { name: 'Dirección', percentage: 67 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Estadísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="PRESENTES HOY" value={118} subtitle="83% de asistencia" />
        <StatCard title="LLEGADAS TARDE" value={9} trend="up" trendValue="+2 vs ayer" />
        <StatCard title="SOLICITUDES PEND." value={5} subtitle="3 vacaciones - 2 cambios" />
        <StatCard title="AUSENCIAS HOY" value={15} subtitle="Requieren atención" subtitleColor="text-red-600" />
      </div>

      {/* Contenido principal: tabla de asistencia + horarios y progreso */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Columna izquierda: tabla de asistencia */}
        <div className="md:col-span-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Asistencia del Día</CardTitle>
              <span className="text-sm text-muted-foreground">Todos los empleados - hoy</span>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>EMPLEADO</TableHead>
                    <TableHead>TURNO</TableHead>
                    <TableHead>ENTRADA</TableHead>
                    <TableHead>SALIDA</TableHead>
                    <TableHead>ESTADO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.turno}</TableCell>
                      <TableCell>{row.entrada}</TableCell>
                      <TableCell>{row.salida}</TableCell>
                      <TableCell className={row.color}>{row.estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: horarios + progreso */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Horarios Activos</CardTitle>
              <p className="text-sm text-muted-foreground">Turnos definidos en el sistema</p>
            </CardHeader>
            <CardContent>
              {horarios.map(horario => (
                <HorarioCard key={horario.title} {...horario} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asistencia por Departamento</CardTitle>
              <p className="text-sm text-muted-foreground">Porcentaje del día - semana actual</p>
            </CardHeader>
            <CardContent>
              {deptos.map(depto => (
                <DeptProgress key={depto.name} {...depto} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;