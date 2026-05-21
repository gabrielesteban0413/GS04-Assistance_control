import React from 'react';
import { AttendanceRecord } from '@/services/admin.service';
import '@/assets/styles/admin.css';

interface RecentAttendanceTableProps {
  records: AttendanceRecord[];
}

const RecentAttendanceTable: React.FC<RecentAttendanceTableProps> = ({ records }) => {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-header">EMPLEADO</th>
            <th className="admin-table-header">ENTRADA</th>
            <th className="admin-table-header">SALIDA</th>
            <th className="admin-table-header">TURNO</th>
            <th className="admin-table-header">ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="admin-table-row">
              <td className="admin-table-cell admin-cell-name">{record.employeeName}</td>
              <td className="admin-table-cell">{record.entryTime || '—'}</td>
              <td className="admin-table-cell">{record.exitTime || '—'}</td>
              <td className="admin-table-cell">{record.shift}</td>
              <td className={`admin-table-cell admin-status-text admin-status-text--${record.status.toLowerCase()}`}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAttendanceTable;