import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieData, getRetirementData } from '@/services/admin.service';

// Colores armoniosos para los segmentos del gráfico.
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6B6B'];

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
    return <div className="flex justify-center items-center h-80">Cargando gráfico...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Retiros</CardTitle>
        <p className="text-sm text-muted-foreground">
          Distribución por motivos de salida (Total de retiros: {data.reduce((acc, cur) => acc + cur.value, 0)})
        </p>
      </CardHeader>
      <CardContent>
        {/* El contenedor responsivo asegura que el gráfico se adapte al ancho de la tarjeta */}
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            {/* Primer nivel de pastel (exterior). Representa las categorías principales. */}
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* Segundo nivel de pastel (interior). Representa la suma de sub-categorías. No contiene datos reales, sino que es una representación estética. */}
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
        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            * El gráfico exterior representa los motivos principales de retiro, mientras que el interior
            muestra su desglose más detallado.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetirementPieChart;