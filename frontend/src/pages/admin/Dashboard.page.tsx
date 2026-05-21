import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
import '@/assets/styles/admin.css';

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

  if (loading) return <div className="admin-page-loading">Cargando dashboard...</div>;

  return (
    <div className="admin-dashboard-container">
      {/* Estadísticas principales */}
      <StatsGrid stats={stats} />

      {/* Gráfico de tendencias (asistencia vs ausencias) */}
      <ActivityChart data={chartData} />

      {/* Sección de tres columnas: gráfico de retiros, actividad reciente, solicitudes pendientes */}
      <div className="admin-three-columns">
        <RetirementPieChart />

        {/* Actividad Reciente con enlace a Asistencia */}
        <div className="admin-card">
          <div className="admin-card-header admin-card-header-row">
            <h3 className="admin-card-title">Actividad Reciente</h3>
            <Link to="/admin/asistencia" className="admin-link-icon">
              <span className="admin-link-text">Ver todas</span>
              <ChevronRight className="admin-icon-sm" />
            </Link>
          </div>
          <div className="admin-card-content">
            <RecentActivityList activities={activities} />
          </div>
        </div>

        {/* Solicitudes Pendientes con enlace a Solicitudes */}
        <div className="admin-card">
          <div className="admin-card-header admin-card-header-row">
            <h3 className="admin-card-title">Solicitudes Pendientes</h3>
            <Link to="/admin/solicitudes" className="admin-link-icon">
              <span className="admin-link-text">Ver todas</span>
              <ChevronRight className="admin-icon-sm" />
            </Link>
          </div>
          <div className="admin-card-content">
            <PendingRequestsList requests={pendingRequests} />
          </div>
        </div>
      </div>

      {/* Últimas Marcaciones con enlace a Asistencia */}
      <div className="admin-card">
        <div className="admin-card-header admin-card-header-row">
          <div>
            <h3 className="admin-card-title">Últimas Marcaciones</h3>
            <p className="admin-card-subtitle">Registros de hoy en tiempo real</p>
          </div>
          <Link to="/admin/asistencia" className="admin-btn-outline admin-btn-sm">
            Ver historial completo
          </Link>
        </div>
        <div className="admin-card-content">
          <RecentAttendanceTable records={attendance} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;