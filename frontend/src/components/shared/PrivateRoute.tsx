import { useSession } from '@/store/session';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { session } = useSession();
    return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
