import Elysia, { t } from 'elysia';
import { appDataSource } from '../db/client';
import { ScheduleEntity } from '../models/schedule';
import { datetimeTool } from '@tools/datetime';
import { uuidTool } from '@tools/uuid';
import { ErrorResourceNotFound } from 'src/errors/resource_not_found';
import { In, IsNull } from 'typeorm';
import { UserEntity } from 'src/models/user';

export const scheduleRoutes = new Elysia();

scheduleRoutes.group(
    '/schedules',
    {
        detail: { tags: ['Schedules'] },
    },
    (app) => {
        app.get('/', async () => {
            try {
                return await appDataSource.manager.find(ScheduleEntity, {
                    where: { deleted_at: IsNull() },
                    order: { created_at: 'DESC' },
                });
            } catch (error) {
                return error;
            }
        });

        app.get('/:id', async (ctx) => {
            try {
                const schedule = await appDataSource.manager.findOneBy(ScheduleEntity, {
                    _id: ctx.params.id,
                });
                if (!schedule) {
                    ctx.status('Not Found');
                    return new ErrorResourceNotFound('Schedule not found');
                }
                return schedule;
            } catch (error) {
                return error;
            }
        });

        app.post(
            '/',
            async (ctx) => {
                try {
                    const users = await appDataSource.manager.find(UserEntity, {
                        where: {
                            _id: In(ctx.body.users_id),
                        },
                    });
                    const result = appDataSource.manager.create(ScheduleEntity, {
                        ...ctx.body,
                        _id: uuidTool.create(),
                        created_at: datetimeTool.now(),
                        updated_at: datetimeTool.now(),
                        deleted_at: null,
                        users,
                    });
                    ctx.status('Created');
                    return await appDataSource.manager.save(ScheduleEntity, result);
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    name: t.String(),
                    start_time: t.String({
                        description: 'Hora de inicio (HH:MM o HH:MM:SS)',
                    }),
                    end_time: t.String({ description: 'Hora de fin (HH:MM o HH:MM:SS)' }),
                    users_id: t.Array(t.String()),
                }),
            },
        );

        app.patch(
            '/:id',
            async (ctx) => {
                try {
                    const schedule = await appDataSource.manager.findOneBy(
                        ScheduleEntity,
                        {
                            _id: ctx.params.id,
                        },
                    );
                    if (!schedule) {
                        ctx.status('Not Found');
                        return new ErrorResourceNotFound('Schedule not found');
                    }
                    await appDataSource.manager.update(ScheduleEntity, ctx.params.id, {
                        ...ctx.body,
                        updated_at: datetimeTool.now(),
                    });
                    return await appDataSource.manager.findOneBy(ScheduleEntity, {
                        _id: ctx.params.id,
                    });
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    name: t.Optional(t.String()),
                    start_time: t.Optional(t.String()),
                    end_time: t.Optional(t.String()),
                }),
            },
        );

        app.delete('/:id', async (ctx) => {
            try {
                const schedule = await appDataSource.manager.findOneBy(ScheduleEntity, {
                    _id: ctx.params.id,
                });
                if (!schedule) {
                    ctx.status('Not Found');
                    return new ErrorResourceNotFound('Schedule not found');
                }
                await appDataSource.manager.update(ScheduleEntity, ctx.params.id, {
                    deleted_at: datetimeTool.now(),
                });
                ctx.status('No Content');
            } catch (error) {
                return error;
            }
        });

        return app;
    },
);
