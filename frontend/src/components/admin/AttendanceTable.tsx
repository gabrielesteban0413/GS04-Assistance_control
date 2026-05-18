import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AttendanceRecordDetail } from '@/services/admin.service';

interface AttendanceTableProps {
  records: AttendanceRecordDetail[];
}

const statusColor: Record<string, string> = {
  Completo: 'text-green-600',
  Retardo: 'text-yellow-600',
  Falta: 'text-red-600',
  Permiso: 'text-blue-600',
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>EMPLEADO</TableHead>
          <TableHead>FECHA</TableHead>
          <TableHead>ENTRADA</TableHead>
          <TableHead>SALIDA</TableHead>
          <TableHead>HORAS</TableHead>
          <TableHead>ESTADO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.employeeName}</TableCell>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.entryTime}</TableCell>
            <TableCell>{record.exitTime}</TableCell>
            <TableCell>{record.hoursWorked}</TableCell>
            <TableCell className={statusColor[record.status]}>
              {record.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;