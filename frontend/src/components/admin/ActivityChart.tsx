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

interface ActivityChartProps {
  data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Asistencia vs Ausencias (última semana)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="asistencias" stroke="#008eb0" strokeWidth={2} />
            <Line type="monotone" dataKey="ausencias" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;