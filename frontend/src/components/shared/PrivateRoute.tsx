import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="auth-loading">Cargando...</div>;
  }
  return <Outlet/>
  // return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;