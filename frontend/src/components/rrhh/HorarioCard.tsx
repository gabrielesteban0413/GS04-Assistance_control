import React from 'react';
import '../../assets/styles/rrhh.css';

interface Horario {
  id: string;
  nombre: string;
  horario: string;
  dias: string;
  empleados: number;
}

interface HorarioCardProps {
  horarios: Horario[];
}

const HorarioCard: React.FC<HorarioCardProps> = ({ horarios }) => {
  return (
    <div className="rrhh-horarios-grid">
      {horarios.map(horario => (
        <div key={horario.id} className="rrhh-horario-card">
          <div className="rrhh-horario-title">{horario.nombre}</div>
          <div className="rrhh-horario-detail"><strong>Horario:</strong> {horario.horario}</div>
          <div className="rrhh-horario-detail"><strong>Días:</strong> {horario.dias}</div>
          <div className="rrhh-horario-detail"><strong>Empleados:</strong> {horario.empleados}</div>
        </div>
      ))}
    </div>
  );
};

export default HorarioCard;