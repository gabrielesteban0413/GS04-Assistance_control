import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/rrhh.css';

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

const fetchRequests = async (): Promise<LeaveRequest[]> => [
  { id: '1', employeeName: 'Ana Gómez', type: 'Vacaciones', startDate: '2025-06-10', endDate: '2025-06-20', reason: 'Descanso anual', status: 'Pendiente' },
  { id: '2', employeeName: 'Carlos Pérez', type: 'Permiso', startDate: '2025-06-05', endDate: '2025-06-05', reason: 'Cita médica', status: 'Aprobada' },
  { id: '3', employeeName: 'Laura Martínez', type: 'Licencia', startDate: '2025-06-15', endDate: '2025-06-18', reason: 'Asuntos personales', status: 'Pendiente' },
  { id: '4', employeeName: 'Jorge Ramírez', type: 'Vacaciones', startDate: '2025-07-01', endDate: '2025-07-10', reason: 'Vacaciones familiares', status: 'Rechazada' },
];

const SolicitudesPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests().then(data => {
      setRequests(data);
      setFilteredRequests(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRequests(requests);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredRequests(requests.filter(r =>
        r.employeeName.toLowerCase().includes(lower) ||
        r.type.toLowerCase().includes(lower) ||
        r.reason.toLowerCase().includes(lower)
      ));
    }
  }, [searchTerm, requests]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    await new Promise(resolve => setTimeout(resolve, 500));
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Aprobada' } : req));
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    await new Promise(resolve => setTimeout(resolve, 500));
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rechazada' } : req));
    setActionLoading(null);
  };

  if (loading) return <div className="rrhh-page-loading">Cargando solicitudes...</div>;

  const pendingCount = requests.filter(r => r.status === 'Pendiente').length;

  return (
    <div className="rrhh-page-container">
      <div className="rrhh-card">
        <div className="rrhh-card-header">
          <h3 className="rrhh-card-title">Solicitudes de Permisos y Vacaciones</h3>
          <div className="rrhh-badge-pending">{pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}</div>
        </div>
        <div className="rrhh-card-content">
          <div className="rrhh-back-link">
            <Link to="/rrhh/dashboard" className="rrhh-link">← Volver al Dashboard</Link>
          </div>

          <div className="rrhh-search-wrapper">
            <input
              type="text"
              placeholder="Buscar por empleado, tipo o motivo..."
              className="rrhh-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rrhh-table-wrapper">
            <table className="rrhh-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Tipo</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="rrhh-table-empty">No hay solicitudes que coincidan</td>
                  </tr>
                ) : (
                  filteredRequests.map(req => (
                    <tr key={req.id}>
                      <td className="rrhh-table-cell-employee">{req.employeeName}</td>
                      <td>{req.type}</td>
                      <td>{req.startDate}</td>
                      <td>{req.endDate}</td>
                      <td className="rrhh-table-cell-reason">{req.reason}</td>
                      <td>
                        <span className={`rrhh-status-badge rrhh-status-${req.status.toLowerCase()}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="rrhh-table-actions">
                        {req.status === 'Pendiente' && (
                          <div className="rrhh-actions-group">
                            <button
                              className="rrhh-btn-approve"
                              onClick={() => handleApprove(req.id)}
                              disabled={actionLoading === req.id}
                            >
                              {actionLoading === req.id ? '...' : 'Aprobar'}
                            </button>
                            <button
                              className="rrhh-btn-reject"
                              onClick={() => handleReject(req.id)}
                              disabled={actionLoading === req.id}
                            >
                              {actionLoading === req.id ? '...' : 'Rechazar'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesPage;