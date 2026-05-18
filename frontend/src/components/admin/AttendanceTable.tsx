import React from 'react';
import { AttendanceRecord } from '../../services/admin.service';

const statusClassMap = {
  Puntual: 'status-puntual',
  Retardo: 'status-retardo',
  Ausente: 'status-ausente',
  Permiso: 'status-permiso',
};

const AttendanceTable: React.FC<{ records: AttendanceRecord[] }> = ({ records }) => {
  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>EMPLEADO</th>
            <th>ENTRADA</th>
            <th>SALIDA</th>
            <th>TURNO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.employeeName}</td>
              <td>{record.entryTime || '—'}</td>
              <td>{record.exitTime || '—'}</td>
              <td>{record.shift}</td>
              <td className={statusClassMap[record.status]}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;