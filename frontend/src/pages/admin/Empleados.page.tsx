import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Employee,
  EmployeeInput,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '@/services/admin.service';
import EmployeesTable from '@/components/admin/EmployeesTable';
import { exportToCSV } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast'; // si tienes toasts de shadcn/ui, sino usa alertas simples

const EmpleadosPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EmployeeInput>({
    nombre: '',
    documento: '',
    email: '',
    departamento: '',
    estado: 'activo',
  });

  const isEditing = !!editingEmployee;

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openCreateDialog = () => {
    setEditingEmployee(null);
    setForm({
      nombre: '',
      documento: '',
      email: '',
      departamento: '',
      estado: 'activo',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setForm({
      nombre: employee.nombre,
      documento: employee.documento,
      email: employee.email,
      departamento: employee.departamento,
      estado: employee.estado,
    });
    setDialogOpen(true);
  };

  const handleChange = (field: keyof EmployeeInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.nombre || !form.documento || !form.email || !form.departamento) {
      alert('Completa todos los campos obligatorios.');
      return;
    }
    setSaving(true);
    try {
      if (isEditing && editingEmployee) {
        await updateEmployee(editingEmployee.id, form);
      } else {
        await createEmployee(form);
      }
      setDialogOpen(false);
      await fetchEmployees();
      alert(isEditing ? 'Empleado actualizado' : 'Empleado creado');
    } catch (error) {
      alert('Error al guardar: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (employee: Employee) => {
    if (confirm(`¿Eliminar a ${employee.nombre}?`)) {
      try {
        await deleteEmployee(employee.id);
        await fetchEmployees();
        alert('Empleado eliminado');
      } catch (error) {
        alert('Error al eliminar: ' + (error as Error).message);
      }
    }
  };

  const handleExportCSV = () => {
    const dataForExport = employees.map(emp => ({
      nombre: emp.nombre,
      documento: emp.documento,
      email: emp.email,
      departamento: emp.departamento,
      estado: emp.estado === 'activo' ? 'Activo' : 'Inactivo',
    }));
    exportToCSV(dataForExport, `empleados_${new Date().toISOString().slice(0, 19)}`);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Empleados</CardTitle>
            <p className="text-sm text-muted-foreground">
              Administra la información de los empleados
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline">
              Exportar CSV
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Empleado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EmployeesTable
            employees={employees}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Diálogo de creación/edición */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar empleado' : 'Nuevo empleado'}</DialogTitle>
            <DialogDescription>
              Completa los datos del empleado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                placeholder="Nombre completo"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="documento">Documento *</Label>
              <Input
                id="documento"
                value={form.documento}
                onChange={(e) => handleChange('documento', e.target.value)}
                placeholder="Número de documento"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="correo@empresa.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="departamento">Departamento *</Label>
              <Input
                id="departamento"
                value={form.departamento}
                onChange={(e) => handleChange('departamento', e.target.value)}
                placeholder="Ej. Ventas, TI, RRHH"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={form.estado}
                onValueChange={(value) => handleChange('estado', value as 'activo' | 'inactivo')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpleadosPage;