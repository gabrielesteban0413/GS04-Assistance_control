import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import RetirementPieChart from '@/components/admin/RetirementPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
      {/* Estadísticas principales */}
      <StatsGrid stats={stats} />

      {/* Gráfico de tendencias (asistencia vs ausencias) */}
      <ActivityChart data={chartData} />

      {/* Sección de tres columnas: gráfico de retiros, actividad reciente, solicitudes pendientes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RetirementPieChart />

        {/* Actividad Reciente con enlace a Asistencia */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Actividad Reciente</CardTitle>
            <Link to="/asistencia">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentActivityList activities={activities} />
          </CardContent>
        </Card>

        {/* Solicitudes Pendientes con enlace a Solicitudes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Solicitudes Pendientes</CardTitle>
            <Link to="/solicitudes">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PendingRequestsList requests={pendingRequests} />
          </CardContent>
        </Card>
      </div>

      {/* Últimas Marcaciones con enlace a Asistencia */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Últimas Marcaciones</CardTitle>
            <p className="text-sm text-muted-foreground">Registros de hoy en tiempo real</p>
          </div>
          <Link to="/asistencia">
            <Button variant="outline" size="sm">
              Ver historial completo
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <RecentAttendanceTable records={attendance} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;