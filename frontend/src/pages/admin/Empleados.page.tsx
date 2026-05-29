import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {
    userServices,
    UserEntity,
    USER_ROLES,
    USER_STATUSES,
    USER_DEPARTMENTS,
} from '@/services/users.service';
import EmployeesTable from '@/components/admin/EmployeesTable';
import { exportToCSV } from '@/utils/exportUtils';
import logo from '@/assets/images/logo_blanco.png';
import '@/assets/styles/admin.css';

const EmpleadosPage: React.FC = () => {
    const [employees, setEmployees] = useState<UserEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<UserEntity | null>(
        null,
    );
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<UserEntity>({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        role: USER_ROLES.ADMIN,
        status: USER_STATUSES.ACTIVE,
        department: USER_DEPARTMENTS.FINANCE,
    });

    const isEditing = !!editingEmployee;

    const fetchEmployees = async () => {
        setLoading(true);
        const data = await userServices.getAll();
        setEmployees(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const openCreateDialog = () => {
        setEditingEmployee(null);
        setForm({
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
            role: USER_ROLES.ADMIN,
            status: USER_STATUSES.ACTIVE,
            department: USER_DEPARTMENTS.FINANCE,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (employee: UserEntity) => {
        setEditingEmployee(employee);
        setForm(employee);
        setDialogOpen(true);
    };

    const handleChange = (field: keyof UserEntity, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (
            !form.first_name ||
            !form.last_name ||
            !form.email ||
            !form.department
        ) {
            alert('Completa todos los campos obligatorios.');
            return;
        }
        setSaving(true);
        try {
            if (isEditing && editingEmployee) {
                await userServices.update(editingEmployee._id, form);
            } else {
                await userServices.create(form);
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

    const handleDelete = async (employee: UserEntity) => {
        if (confirm(`¿Eliminar a ${employee.first_name}?`)) {
            try {
                await userServices.delete(employee._id);
                await fetchEmployees();
                alert('Empleado eliminado');
            } catch (error) {
                alert('Error al eliminar: ' + (error as Error).message);
            }
        }
    };

    const handleExportCSV = () => {
        const dataForExport = employees.map((emp) => ({
            nombre: emp.first_name,
            apellido: emp.last_name,
            email: emp.email,
            departamento: emp.department,
            estado: emp.status,
        }));
        exportToCSV(
            dataForExport,
            `empleados_${new Date().toISOString().slice(0, 19)}`,
        );
    };

    return (
        <div className="admin-page-container">
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-empleados-header">
                        <div className="admin-logo">
                            <img
                                src={logo}
                                alt="Logo"
                                className="admin-logo-img"
                            />
                        </div>
                        <div className="admin-title-wrapper">
                            <h2 className="admin-page-title">
                                Gestión de Empleados
                            </h2>
                        </div>
                        <div className="admin-header-actions">
                            <button
                                onClick={handleExportCSV}
                                className="admin-btn-outline"
                            >
                                Exportar CSV
                            </button>
                            <button
                                onClick={openCreateDialog}
                                className="admin-btn-primary"
                            >
                                <Plus className="admin-icon-sm" /> Nuevo
                                Empleado
                            </button>
                        </div>
                    </div>
                </div>
                <div className="admin-card-content">
                    <EmployeesTable
                        employees={employees}
                        loading={loading}
                        onEdit={openEditDialog}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {/* Modal personalizado */}
            {dialogOpen && (
                <div
                    className="admin-modal-overlay"
                    onClick={() => setDialogOpen(false)}
                >
                    <div
                        className="admin-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">
                                {isEditing
                                    ? 'Editar empleado'
                                    : 'Nuevo empleado'}
                            </h3>
                            <p className="admin-modal-description">
                                Completa los datos del empleado.
                            </p>
                        </div>
                        <div className="admin-modal-body">
                            <div className="admin-form-group">
                                <label htmlFor="nombre" className="admin-label">
                                    Nombre *
                                </label>
                                <input
                                    id="nombre"
                                    type="text"
                                    className="admin-input"
                                    value={form.first_name}
                                    onChange={(e) =>
                                        handleChange(
                                            'first_name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Nombre completo"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label
                                    htmlFor="documento"
                                    className="admin-label"
                                >
                                    Documento *
                                </label>
                                <input
                                    id="last_name"
                                    type="text"
                                    className="admin-input"
                                    value={form.last_name}
                                    onChange={(e) =>
                                        handleChange(
                                            'last_name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label htmlFor="email" className="admin-label">
                                    Email *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="admin-input"
                                    value={form.email}
                                    onChange={(e) =>
                                        handleChange('email', e.target.value)
                                    }
                                    placeholder="correo@empresa.com"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label
                                    htmlFor="departamento"
                                    className="admin-label"
                                >
                                    Departamento *
                                </label>
                                <input
                                    id="departamento"
                                    type="text"
                                    className="admin-input"
                                    value={form.department}
                                    onChange={(e) =>
                                        handleChange(
                                            'department',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ej. Ventas, TI, RRHH"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label htmlFor="estado" className="admin-label">
                                    Estado
                                </label>
                                <select
                                    id="estado"
                                    className="admin-select"
                                    value={form.status}
                                    onChange={(e) =>
                                        handleChange(
                                            'status',
                                            e.target.value as
                                                | 'activo'
                                                | 'inactivo',
                                        )
                                    }
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button
                                className="admin-btn-outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="admin-btn-primary"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving
                                    ? 'Guardando...'
                                    : isEditing
                                      ? 'Actualizar'
                                      : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmpleadosPage;
