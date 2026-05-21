import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { LeaveRequest, getLeaveRequests } from '@/services/admin.service';
import RequestsTable from '@/components/admin/RequestsTable';
import { exportToCSV } from '@/utils/exportUtils';
import logo from '@/assets/images/logo_blanco.png';
import '@/assets/styles/admin.css';

const SolicitudesPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getLeaveRequests();
      setRequests(data);
      setFilteredRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRequests(requests);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = requests.filter(req =>
      req.employeeName.toLowerCase().includes(lowerSearch) ||
      req.type.toLowerCase().includes(lowerSearch) ||
      req.status.toLowerCase().includes(lowerSearch) ||
      req.reason.toLowerCase().includes(lowerSearch)
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Aprobada' as const } : req
      )
    );
    console.log(`Aprobada solicitud ${id}`);
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Rechazada' as const } : req
      )
    );
    console.log(`Rechazada solicitud ${id}`);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredRequests, `solicitudes_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="admin-page-loading">Cargando solicitudes...</div>;
  }

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-solicitudes-header">
            <div className="admin-logo">
              <img src={logo} alt="Logo" className="admin-logo-img" />
            </div>
            <div className="admin-title-wrapper">
              <h2 className="admin-page-title">Gestión de Solicitudes</h2>
            </div>
            <div className="admin-header-actions">
              <div className="admin-search-wrapper">
                <Search className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar empleado, tipo, estado, motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <button onClick={handleExportCSV} className="admin-btn-outline">
                Exportar a CSV
              </button>
            </div>
          </div>
        </div>
        <div className="admin-card-content">
          <RequestsTable
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </div>
  );
};

export default SolicitudesPage;