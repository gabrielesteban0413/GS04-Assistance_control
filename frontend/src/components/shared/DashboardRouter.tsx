import { USER_ROLES } from '@/services/users.service';
import { useSession } from '@/store/session';
import React from 'react';
import { Navigate } from 'react-router-dom';

const DashboardRouter: React.FC = () => {
    const { session } = useSession();
    if (!session) return <Navigate to="/login" />;

    if (session.user.role === USER_ROLES.ADMIN)
        return <Navigate to="/admin/dashboard" />;
    if (session.user.role === USER_ROLES.RH)
        return <Navigate to="/rrhh/dashboard" />;
    return <Navigate to="/employee/dashboard" />;
};

export default DashboardRouter;
