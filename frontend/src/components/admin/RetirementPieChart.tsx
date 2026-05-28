import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieData, getRetirementData } from '@/services/admin.service';
import '@/assets/styles/admin.css';

// Paleta de colores más profesional
const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec489a'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RetirementPieChart: React.FC = () => {
  const [data, setData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const retirementData = await getRetirementData();
      setData(retirementData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="admin-chart-loading">Cargando gráfico...</div>;
  }

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="admin-chart-card">
      <div className="admin-chart-header">
        <h3 className="admin-chart-title">Análisis de Retiros</h3>
        <p className="admin-chart-subtitle">
          Total de retiros: <strong>{total}</strong> empleados
        </p>
      </div>
      <div className="admin-chart-content">
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} empleados`, name]}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ paddingLeft: '20px' }}
              formatter={(value, entry, index) => (
                <span style={{ color: '#333', fontSize: '13px' }}>
                  {value}: {data[index as number]?.value} ({((data[index as number]?.value / total) * 100).toFixed(1)}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RetirementPieChart;