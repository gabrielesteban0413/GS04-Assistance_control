import React from 'react';
import { AttendanceRecordDetail } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

interface AttendanceTableProps {
    records: AttendanceRecordDetail[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th className="admin-table-header">EMPLEADO</th>
                        <th className="admin-table-header">FECHA</th>
                        <th className="admin-table-header">ENTRADA</th>
                        <th className="admin-table-header">SALIDA</th>
                        <th className="admin-table-header">HORAS</th>
                        <th className="admin-table-header">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id} className="admin-table-row">
                            <td className="admin-table-cell admin-cell-name">
                                {record.employeeName}
                            </td>
                            <td className="admin-table-cell">{record.date}</td>
                            <td className="admin-table-cell">
                                {record.entryTime}
                            </td>
                            <td className="admin-table-cell">
                                {record.exitTime}
                            </td>
                            <td className="admin-table-cell">
                                {record.hoursWorked}
                            </td>
                            <td
                                className={`admin-table-cell admin-status-text admin-status-text--${record.status.toLowerCase()}`}
                            >
                                {record.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
