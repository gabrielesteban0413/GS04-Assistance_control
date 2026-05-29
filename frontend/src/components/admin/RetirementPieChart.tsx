import React, { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { PieData, getRetirementData } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28EFF',
    '#FF6B6B',
];

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
                    Distribución por motivos de salida (Total de retiros:{' '}
                    {total})
                </p>
            </div>
            <div className="admin-chart-content">
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={120}
                            fill="#82ca9d"
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="admin-chart-note">
                    <p>
                        * El gráfico exterior representa los motivos principales
                        de retiro, mientras que el interior muestra su desglose
                        más detallado.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RetirementPieChart;
