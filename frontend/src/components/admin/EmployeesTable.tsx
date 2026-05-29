import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Employee } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

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
            <div className="admin-loading-container">
                <div className="admin-spinner"></div>
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="admin-empty-message">
                No hay empleados registrados.
            </div>
        );
    }

    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th className="admin-table-header">NOMBRE</th>
                        <th className="admin-table-header">DOCUMENTO</th>
                        <th className="admin-table-header">EMAIL</th>
                        <th className="admin-table-header">DEPARTAMENTO</th>
                        <th className="admin-table-header">ESTADO</th>
                        <th className="admin-table-header">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="admin-table-row">
                            <td className="admin-table-cell admin-cell-name">
                                {emp.nombre}
                            </td>
                            <td className="admin-table-cell">
                                {emp.documento}
                            </td>
                            <td className="admin-table-cell">{emp.email}</td>
                            <td className="admin-table-cell">
                                {emp.departamento}
                            </td>
                            <td className="admin-table-cell">
                                <span
                                    className={`admin-status-badge ${emp.estado === 'activo' ? 'admin-status-active' : 'admin-status-inactive'}`}
                                >
                                    {emp.estado === 'activo'
                                        ? 'Activo'
                                        : 'Inactivo'}
                                </span>
                            </td>
                            <td className="admin-table-cell admin-actions-cell">
                                <button
                                    className="admin-action-btn"
                                    onClick={() => onEdit(emp)}
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    className="admin-action-btn admin-action-btn--delete"
                                    onClick={() => onDelete(emp)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesTable;
