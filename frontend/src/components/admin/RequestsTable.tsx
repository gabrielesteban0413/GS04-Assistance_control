import React from 'react';
import { LeaveRequest } from '@/services/admin.service';
import '@/assets/styles/admin.css';

interface RequestsTableProps {
  requests: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onApprove, onReject }) => {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-header">EMPLEADO</th>
            <th className="admin-table-header">TIPO</th>
            <th className="admin-table-header">FECHA INICIO</th>
            <th className="admin-table-header">FECHA FIN</th>
            <th className="admin-table-header">MOTIVO</th>
            <th className="admin-table-header">ESTADO</th>
            <th className="admin-table-header">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="admin-table-row">
              <td className="admin-table-cell admin-cell-name">{req.employeeName}</td>
              <td className="admin-table-cell">{req.type}</td>
              <td className="admin-table-cell">{req.startDate}</td>
              <td className="admin-table-cell">{req.endDate}</td>
              <td className="admin-table-cell">{req.reason}</td>
              <td className={`admin-table-cell admin-status-text admin-status-text--${req.status.toLowerCase()}`}>
                {req.status}
              </td>
              <td className="admin-table-cell">
                {req.status === 'Pendiente' && (
                  <div className="admin-requests-actions">
                    <button className="admin-btn-approve" onClick={() => onApprove(req.id)}>Aprobar</button>
                    <button className="admin-btn-reject" onClick={() => onReject(req.id)}>Rechazar</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;