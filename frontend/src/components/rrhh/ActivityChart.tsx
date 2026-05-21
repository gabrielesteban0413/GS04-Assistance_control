import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../../assets/styles/rrhh.css';

interface ChartData {
  mes: string;
  contrataciones: number;
  rotacion: number;
}

interface ActivityChartProps {
  data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="rrhh-chart-card">
      <div className="rrhh-chart-header">
        <h3 className="rrhh-chart-title">Contrataciones vs Rotación (últimos 6 meses)</h3>
      </div>
      <div className="rrhh-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="contrataciones"
              className="rrhh-chart-line--contrataciones"
            />
            <Line
              type="monotone"
              dataKey="rotacion"
              className="rrhh-chart-line--rotacion"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;