import Elysia from 'elysia';
import { userRoutes } from './users';
import { authRoutes } from './auth';
import { scheduleRoutes } from './schedules';
import { attendanceRoutes } from './attendances';
import { changelogRoutes } from './changelog';
import { routerHealthy } from './healthy';
import { analyticsRoutes } from './analytics';

export const routes = new Elysia();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(scheduleRoutes);
routes.use(attendanceRoutes);
routes.use(changelogRoutes);
routes.use(routerHealthy);
routes.use(analyticsRoutes);
