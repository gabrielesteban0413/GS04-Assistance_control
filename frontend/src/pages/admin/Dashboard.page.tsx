import React, { useEffect, useState } from 'react';
import {
  getDashboardStats,
  getRecentAttendance,
  getRecentActivity,
  getPendingRequests,
  getAttendanceChartData,
  Stat,
  AttendanceRecord,
  Activity,
  PendingRequest,
  ChartData,
} from '@/services/admin.service';
import StatsGrid from '@/components/admin/StatsGrid';
import RecentAttendanceTable from '@/components/admin/RecentAttendanceTable';
import RecentActivityList from '@/components/admin/RecentActivityList';
import PendingRequestsList from '@/components/admin/PendingRequestsList';
import ActivityChart from '@/components/admin/ActivityChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, attendanceData, activitiesData, requestsData, chartData] = await Promise.all([
        getDashboardStats(),
        getRecentAttendance(),
        getRecentActivity(),
        getPendingRequests(),
        getAttendanceChartData(),
      ]);
      setStats(statsData);
      setAttendance(attendanceData);
      setActivities(activitiesData);
      setPendingRequests(requestsData);
      setChartData(chartData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando dashboard...</div>;

  return (
    <div className="space-y-6 p-6">
      <StatsGrid stats={stats} />

      {/* Últimas Marcaciones: ocupa todo el ancho */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Marcaciones</CardTitle>
          <p className="text-sm text-muted-foreground">Registros de hoy en tiempo real</p>
        </CardHeader>
        <CardContent>
          <RecentAttendanceTable records={attendance} />
        </CardContent>
      </Card>

      {/* Tres columnas: gráfico, actividad reciente, solicitudes pendientes */}
      <div className="grid gap-6 md:grid-cols-3">
        <ActivityChart data={chartData} />

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList activities={activities} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Solicitudes Pendientes</CardTitle>
              <button className="text-sm text-primary hover:underline">Ver todas →</button>
            </div>
          </CardHeader>
          <CardContent>
            <PendingRequestsList requests={pendingRequests} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;