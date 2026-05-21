import React, { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
import { listHorarios, Horario } from '@/services/horario.service';
import logo from '@/assets/images/logo_blanco.png';
import '@/assets/styles/admin.css';

const HorariosPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      const data = await listHorarios();
      setHorarios(data);
      setLoading(false);
    };
    fetchHorarios();
  }, []);

  if (loading) {
    return <div className="admin-page-loading">Cargando horarios...</div>;
  }

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-horarios-header">
            <div className="admin-logo">
              <img src={logo} alt="Logo" className="admin-logo-img" />
            </div>
            <div className="admin-title-wrapper">
              <h2 className="admin-page-title">Horarios y Turnos</h2>
              <p className="admin-page-subtitle">Configuración de horarios por departamento</p>
            </div>
            <div className="admin-spacer"></div>
          </div>
        </div>
        <div className="admin-card-content">
          <div className="admin-horarios-grid">
            {horarios.map((horario) => (
              <div key={horario.id} className="admin-horario-card">
                <div className="admin-horario-card-content">
                  <div className="admin-horario-header">
                    <h3 className="admin-horario-title">{horario.nombre}</h3>
                    <span className="admin-badge">{horario.empleados} emp.</span>
                  </div>
                  <div className="admin-horario-details">
                    <p><strong>Horario:</strong> {horario.horario}</p>
                    <p><strong>Días:</strong> {horario.dias}</p>
                  </div>
                  <button className="admin-btn-ghost admin-btn-sm">
                    <Edit className="admin-icon-sm" /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorariosPage;