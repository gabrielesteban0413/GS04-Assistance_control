import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AttendanceRecord } from '@/services/admin.service';

interface RecentAttendanceTableProps {
  records: AttendanceRecord[];
}

const statusColor: Record<string, string> = {
  Puntual: 'text-green-600',
  Retardo: 'text-yellow-600',
  Ausente: 'text-red-600',
  Permiso: 'text-blue-600',
};

const RecentAttendanceTable: React.FC<RecentAttendanceTableProps> = ({ records }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>EMPLEADO</TableHead>
          <TableHead>ENTRADA</TableHead>
          <TableHead>SALIDA</TableHead>
          <TableHead>TURNO</TableHead>
          <TableHead>ESTADO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.employeeName}</TableCell>
            <TableCell>{record.entryTime || '—'}</TableCell>
            <TableCell>{record.exitTime || '—'}</TableCell>
            <TableCell>{record.shift}</TableCell>
            <TableCell className={statusColor[record.status]}>
              {record.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentAttendanceTable;