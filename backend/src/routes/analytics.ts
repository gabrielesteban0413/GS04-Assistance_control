import Elysia from 'elysia';
import { appDataSource } from '../db/client';

export const analyticsRoutes = new Elysia();

analyticsRoutes.group(
    '/analytics',
    {
        detail: { tags: ['Analytics'] },
    },
    (app) => {
        app.get('/dashboard', async () => {
            try {
                const [totalResult, presentResult, lateResult, chartResult] =
                    await Promise.all([
                        // Total empleados activos
                        appDataSource.manager.query<{ count: string }[]>(`
                        SELECT COUNT(*)::int AS count
                        FROM "USERS"
                        WHERE status = 'Activo'
                          AND deleted_at IS NULL
                    `),

                        // Presentes hoy
                        appDataSource.manager.query<{ count: string }[]>(`
                        SELECT COUNT(*)::int AS count
                        FROM "ATTENDANCES"
                        WHERE DATE(check_in AT TIME ZONE 'UTC') = CURRENT_DATE
                    `),

                        // Llegadas tarde hoy (check_in posterior al start_time del horario asignado)
                        appDataSource.manager.query<{ count: string }[]>(`
                        SELECT COUNT(*)::int AS count
                        FROM "ATTENDANCES" a
                        JOIN "SCHEDULES" s ON a.schedule_id = s._id
                        WHERE DATE(a.check_in AT TIME ZONE 'UTC') = CURRENT_DATE
                          AND (a.check_in AT TIME ZONE 'UTC')::time
                              > (s.start_time AT TIME ZONE 'UTC')::time
                    `),

                        // Gráfica: asistencias vs ausencias últimos 30 días
                        appDataSource.manager.query<
                            { date: string; present: number; absent: number }[]
                        >(`
                        SELECT
                            TO_CHAR(d.day, 'YYYY-MM-DD') AS date,
                            COALESCE(COUNT(a._id), 0)::int AS present,
                            GREATEST(
                                (
                                    SELECT COUNT(*)::int
                                    FROM "USERS"
                                    WHERE status = 'Activo'
                                      AND deleted_at IS NULL
                                ) - COALESCE(COUNT(a._id), 0),
                                0
                            )::int AS absent
                        FROM generate_series(
                            CURRENT_DATE - INTERVAL '29 days',
                            CURRENT_DATE,
                            '1 day'::interval
                        ) d(day)
                        LEFT JOIN "ATTENDANCES" a
                            ON DATE(a.check_in AT TIME ZONE 'UTC') = d.day
                        GROUP BY d.day
                        ORDER BY d.day
                    `),
                    ]);

                const total_employees = Number(totalResult[0]?.count ?? 0);
                const present_today = Number(presentResult[0]?.count ?? 0);
                const late_today = lateResult[0]?.count ?? 0;
                const absent_today = Math.max(total_employees - present_today, 0);

                return {
                    total_employees,
                    present_today,
                    late_today,
                    absent_today,
                    chart: chartResult,
                };
            } catch (error) {
                return error;
            }
        });

        return app;
    },
);
