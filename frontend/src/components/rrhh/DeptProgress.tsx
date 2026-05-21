import React from 'react';
import '../../assets/styles/rrhh.css';

interface DeptProgressProps {
  data: { name: string; porcentaje: number }[];
}

const DeptProgress: React.FC<DeptProgressProps> = ({ data }) => {
  return (
    <div className="rrhh-dept-progress-list">
      {data.map((dept, idx) => (
        <div key={idx} className="rrhh-dept-progress">
          <div className="rrhh-dept-header">
            <span className="rrhh-dept-name">{dept.name}</span>
            <span className="rrhh-dept-percent">{dept.porcentaje}%</span>
          </div>
          <div className="rrhh-progress-bar">
            <div className="rrhh-progress-fill" style={{ width: `${dept.porcentaje}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeptProgress;