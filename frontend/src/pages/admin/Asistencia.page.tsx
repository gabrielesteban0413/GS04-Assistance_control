import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { AttendanceRecordDetail, getAttendanceRecords } from '@/services/admin.service';
import AttendanceTable from '@/components/admin/AttendanceTable';
import { exportToCSV } from '@/utils/exportUtils';
import logo from '@/assets/images/logo_blanco.png';
import '@/assets/styles/admin.css';

const AsistenciaPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecordDetail[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecordDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getAttendanceRecords();
      setRecords(data);
      setFilteredRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecords(records);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = records.filter(record =>
      record.employeeName.toLowerCase().includes(lowerSearch) ||
      record.date.includes(searchTerm) ||
      record.status.toLowerCase().includes(lowerSearch)
    );
    setFilteredRecords(filtered);
  }, [searchTerm, records]);

  const handleExportCSV = () => {
    exportToCSV(filteredRecords, `asistencia_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="admin-page-loading">Cargando registros de asistencia...</div>;
  }

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-asistencia-header">
            {/* Logo izquierda */}
            <div className="admin-logo">
              <img src={logo} alt="Logo" className="admin-logo-img" />
            </div>

            {/* Título centrado */}
            <div className="admin-title-wrapper">
              <h2 className="admin-page-title">Gestión de Asistencia</h2>
            </div>

            {/* Buscador + exportar */}
            <div className="admin-header-actions">
              <div className="admin-search-wrapper">
                <Search className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar empleado, fecha o estado..."
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
          <AttendanceTable records={filteredRecords} />
        </div>
      </div>
    </div>
  );
};

export default AsistenciaPage;