import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Calendar, TrendingUp, Download } from 'lucide-react';
import '../../assets/styles/rrhh.css';

const ReportesPage: React.FC = () => {
  const handleExport = (tipo: string) => {
    alert(`Exportando reporte de ${tipo}...`);
  };

  return (
    <div className="rrhh-page-container">
      <div className="rrhh-card">
        <div className="rrhh-card-header">
          <h3 className="rrhh-card-title">Reportes de RRHH</h3>
          <div className="rrhh-back-link">
            <Link to="/rrhh/dashboard" className="rrhh-link">← Volver al Dashboard</Link>
          </div>
        </div>
        <div className="rrhh-card-content">
          <div className="rrhh-reportes-grid">
            {/* Reporte 1 */}
            <div className="rrhh-reporte-card">
              <FileText className="rrhh-reporte-icon" />
              <h4 className="rrhh-reporte-title">Asistencia mensual</h4>
              <p className="rrhh-reporte-description">
                Resumen detallado de asistencia por empleado, incluyo horas trabajadas, retardos y ausencias.
              </p>
              <button className="rrhh-btn-primary" onClick={() => handleExport('asistencia')}>
                <Download size={16} /> Exportar CSV
              </button>
            </div>

            {/* Reporte 2 */}
            <div className="rrhh-reporte-card">
              <Users className="rrhh-reporte-icon" />
              <h4 className="rrhh-reporte-title">Rotación de personal</h4>
              <p className="rrhh-reporte-description">
                Indicadores de contrataciones, desvinculaciones y tasa de rotación por departamento.
              </p>
              <button className="rrhh-btn-primary" onClick={() => handleExport('rotacion')}>
                <Download size={16} /> Exportar CSV
              </button>
            </div>

            {/* Reporte 3 */}
            <div className="rrhh-reporte-card">
              <Calendar className="rrhh-reporte-icon" />
              <h4 className="rrhh-reporte-title">Vacaciones pendientes</h4>
              <p className="rrhh-reporte-description">
                Listado de empleados con días de vacaciones acumulados y no tomados.
              </p>
              <button className="rrhh-btn-primary" onClick={() => handleExport('vacaciones')}>
                <Download size={16} /> Exportar CSV
              </button>
            </div>

            {/* Reporte 4 - adicional */}
            <div className="rrhh-reporte-card">
              <TrendingUp className="rrhh-reporte-icon" />
              <h4 className="rrhh-reporte-title">Productividad por área</h4>
              <p className="rrhh-reporte-description">
                Análisis de desempeño y cumplimiento de objetivos por departamento.
              </p>
              <button className="rrhh-btn-primary" onClick={() => handleExport('productividad')}>
                <Download size={16} /> Exportar CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesPage;