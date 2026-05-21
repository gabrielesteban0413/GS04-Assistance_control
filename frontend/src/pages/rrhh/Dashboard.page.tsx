import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatsGrid from '../../components/rrhh/StatsGrid';
import DeptProgress from '../../components/rrhh/DeptProgress';
import HorarioCard from '../../components/rrhh/HorarioCard';
import RecentActivityList from '../../components/rrhh/RecentActivityList';
import ActivityChart from '../../components/rrhh/ActivityChart';
import RrhhPieChart from '../../components/rrhh/PieChart';
import '../../assets/styles/rrhh.css';

// Funciones mock (reemplazar con llamadas a servicios reales)
const fetchStats = async () => [
  { title: 'Total Empleados', value: 128, subtitle: '+12 este mes', trend: 'up', trendValue: '8%' },
  { title: 'Nuevas Contrataciones', value: 8, subtitle: 'Últimos 30 días', trend: 'up', trendValue: '2' },
  { title: 'Rotación', value: '3.2%', subtitle: 'Mensual', trend: 'down', trendValue: '0.5%' },
  { title: 'Vacaciones Pendientes', value: 24, subtitle: 'Solicitudes por aprobar' },
];

const fetchDeptProgress = async () => [
  { name: 'Ventas', porcentaje: 85 },
  { name: 'TI', porcentaje: 92 },
  { name: 'RRHH', porcentaje: 78 },
  { name: 'Operaciones', porcentaje: 64 },
];

const fetchHorarios = async () => [
  { id: '1', nombre: 'Turno Mañana', horario: '08:00 - 16:00', dias: 'Lun-Vie', empleados: 45 },
  { id: '2', nombre: 'Turno Tarde', horario: '14:00 - 22:00', dias: 'Lun-Vie', empleados: 38 },
  { id: '3', nombre: 'Turno Noche', horario: '22:00 - 06:00', dias: 'Lun-Dom', empleados: 20 },
];

const fetchRecentActivity = async () => [
  { id: '1', description: 'Carlos Pérez solicitó vacaciones', timestamp: 'Hace 10 min' },
  { id: '2', description: 'Nuevo empleado: Ana Gómez', timestamp: 'Hace 2 horas' },
  { id: '3', description: 'Actualización de horarios', timestamp: 'Ayer' },
  { id: '4', description: 'Reporte mensual generado', timestamp: 'Hace 1 día' },
];

const fetchLineChartData = async () => [
  { mes: 'Ene', contrataciones: 5, rotacion: 2 },
  { mes: 'Feb', contrataciones: 7, rotacion: 3 },
  { mes: 'Mar', contrataciones: 4, rotacion: 1 },
  { mes: 'Abr', contrataciones: 6, rotacion: 2 },
  { mes: 'May', contrataciones: 8, rotacion: 3 },
  { mes: 'Jun', contrataciones: 10, rotacion: 2 },
];

const fetchPieChartData = async () => [
  { name: 'Ventas', value: 45 },
  { name: 'TI', value: 38 },
  { name: 'RRHH', value: 12 },
  { name: 'Operaciones', value: 33 },
];

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState([]);
  const [deptProgress, setDeptProgress] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [activities, setActivities] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const [s, d, h, a, line, pie] = await Promise.all([
      fetchStats(),
      fetchDeptProgress(),
      fetchHorarios(),
      fetchRecentActivity(),
      fetchLineChartData(),
      fetchPieChartData(),
    ]);
    setStats(s);
    setDeptProgress(d);
    setHorarios(h);
    setActivities(a);
    setLineData(line);
    setPieData(pie);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  if (loading) return <div className="rrhh-page-loading">Cargando panel de RRHH...</div>;

  return (
    <div className="rrhh-page-container">
      {/* Botón refrescar (acción sin navegación) */}
      <div className="rrhh-refresh-wrapper">
        <button className="rrhh-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Actualizando...' : '⟳ Actualizar datos'}
        </button>
      </div>

      {/* Tarjetas de estadísticas */}
      <StatsGrid stats={stats} />



      {/* Gráficos: dos columnas */}
      <div className="rrhh-two-columns">
        <ActivityChart data={lineData} />
        <RrhhPieChart data={pieData} />
      </div>

      {/* Progreso por departamento + Horarios */}
      <div className="rrhh-two-columns">
        <div className="rrhh-card">
          <div className="rrhh-card-header">
            <h3 className="rrhh-card-title">Progreso por Departamento</h3>
          </div>
          <div className="rrhh-card-content">
            <DeptProgress data={deptProgress} />
          </div>
        </div>
        <div className="rrhh-card">
          <div className="rrhh-card-header">
            <h3 className="rrhh-card-title">Horarios Destacados</h3>
          </div>
          <div className="rrhh-card-content">
            <HorarioCard horarios={horarios} />
          </div>
        </div>
      </div>

      {/* Actividad reciente con enlace a la página de solicitudes */}
      <div className="rrhh-card">
        <div className="rrhh-card-header">
          <h3 className="rrhh-card-title">Actividad Reciente</h3>
          <Link to="/rrhh/solicitudes" className="rrhh-link">Ver todas →</Link>
        </div>
        <div className="rrhh-card-content">
          <RecentActivityList activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;