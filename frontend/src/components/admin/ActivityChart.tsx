import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/services/admin.service';
import '@/assets/styles/admin.css';

interface ActivityChartProps {
  data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="admin-chart-card">
      <div className="admin-chart-header">
        <h3 className="admin-chart-title">Asistencia vs Ausencias (última semana)</h3>
      </div>
      <div className="admin-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="asistencias" className="admin-chart-line--attendance" />
            <Line type="monotone" dataKey="ausencias" className="admin-chart-line--absence" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;