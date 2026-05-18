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
import { Pencil, Trash2 } from 'lucide-react';
import { Employee } from '@/services/admin.service';

interface EmployeesTableProps {
  employees: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (employees.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No hay empleados registrados.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NOMBRE</TableHead>
          <TableHead>DOCUMENTO</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>DEPARTAMENTO</TableHead>
          <TableHead>ESTADO</TableHead>
          <TableHead>ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell className="font-medium">{emp.nombre}</TableCell>
            <TableCell>{emp.documento}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.departamento}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emp.estado === 'activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {emp.estado === 'activo' ? 'Activo' : 'Inactivo'}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(emp)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(emp)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;