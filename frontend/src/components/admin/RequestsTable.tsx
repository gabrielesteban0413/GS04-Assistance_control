import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { LeaveRequest } from '@/services/admin.service';

interface RequestsTableProps {
  requests: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const statusColor: Record<string, string> = {
  Pendiente: 'text-yellow-600',
  Aprobada: 'text-green-600',
  Rechazada: 'text-red-600',
};

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onApprove, onReject }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>EMPLEADO</TableHead>
          <TableHead>TIPO</TableHead>
          <TableHead>FECHA INICIO</TableHead>
          <TableHead>FECHA FIN</TableHead>
          <TableHead>MOTIVO</TableHead>
          <TableHead>ESTADO</TableHead>
          <TableHead>ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell className="font-medium">{req.employeeName}</TableCell>
            <TableCell>{req.type}</TableCell>
            <TableCell>{req.startDate}</TableCell>
            <TableCell>{req.endDate}</TableCell>
            <TableCell>{req.reason}</TableCell>
            <TableCell className={statusColor[req.status]}>{req.status}</TableCell>
            <TableCell>
              {req.status === 'Pendiente' && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onApprove(req.id)} variant="default">
                    Aprobar
                  </Button>
                  <Button size="sm" onClick={() => onReject(req.id)} variant="destructive">
                    Rechazar
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestsTable;