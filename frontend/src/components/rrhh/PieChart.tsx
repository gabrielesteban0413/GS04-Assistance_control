import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../../assets/styles/rrhh.css';

interface PieData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6B6B'];

const RrhhPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="rrhh-chart-card">
      <div className="rrhh-chart-header">
        <h3 className="rrhh-chart-title">Distribución por Departamento</h3>
      </div>
      <div className="rrhh-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RrhhPieChart;