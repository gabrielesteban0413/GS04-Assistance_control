import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/services/admin.service';
import '@/assets/styles/components/_activity-chart.css';

interface ActivityChartProps {
  data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <Card className="activity-chart">
      <CardHeader>
        <CardTitle>Asistencia vs Ausencias (última semana)</CardTitle>
      </CardHeader>
      <CardContent className="activity-chart__content">
        <ResponsiveContainer width="100%" height={300}> {/* height aún necesario */}
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" /> {/* strokeDasharray es visual, pero lo movemos a CSS? A veces Recharts ignora CSS para esta propiedad; lo dejamos por simplicidad */}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Solo dataKey y className, sin stroke ni strokeWidth */}
            <Line type="monotone" dataKey="asistencias" className="line-asistencias" />
            <Line type="monotone" dataKey="ausencias" className="line-ausencias" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;