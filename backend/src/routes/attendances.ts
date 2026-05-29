import Elysia, { t } from 'elysia';
import { appDataSource } from '../db/client';
import { AttendanceEntity } from '../models/attendance';
import { datetimeTool } from '@tools/datetime';
import { uuidTool } from '@tools/uuid';
import { ScheduleEntity } from 'src/models/schedule';
import { UserEntity } from 'src/models/user';
import { IsNull } from 'typeorm';
import { CHANGELOG_ACTIONS } from 'src/models/changelog';
import { saveChangelog } from '@tools/changelog';

export const attendanceRoutes = new Elysia();

attendanceRoutes.group(
    '/attendances',
    {
        detail: { tags: ['Attendances'] },
    },
    (app) => {
        app.get('/', async () => {
            try {
                return await appDataSource.manager.find(AttendanceEntity);
            } catch (error) {
                return error;
            }
        });

        app.post(
            '/in',
            async (ctx) => {
                try {
                    const now = datetimeTool.now();
                    const user = await appDataSource.manager.findOneBy(UserEntity, {
                        email: ctx.body.email,
                    });
                    if (!user) return ctx.status('Not Found');

                    const schedule = await appDataSource.manager.findOne(ScheduleEntity, {
                        where: { users: { _id: user._id } },
                        order: { created_at: 'DESC' },
                    });

                    const attendanceOut = await appDataSource.manager.findOneBy(AttendanceEntity, {
                        check_out: IsNull(),
                    });
                    if (attendanceOut) return ctx.status('Bad Request');

                    const result = appDataSource.manager.create(AttendanceEntity, {
                        _id: uuidTool.create(),
                        user_id: user._id,
                        schedule_id: schedule?._id ?? null,
                        check_in: now,
                        check_out: null,
                        created_at: now,
                        updated_at: now,
                    });
                    const attendance = await appDataSource.manager.save(AttendanceEntity, result);

                    await saveChangelog({
                        requester: { created_by: user._id, login: user.email },
                        action: CHANGELOG_ACTIONS.CREATED,
                        resource: 'attendance',
                        resource_id: attendance._id,
                        before: null,
                        after: attendance,
                    });

                    ctx.status('Created');
                    return attendance;
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    email: t.String(),
                }),
            },
        );

        app.post(
            '/out',
            async (ctx) => {
                try {
                    const now = datetimeTool.now();
                    const user = await appDataSource.manager.findOneBy(UserEntity, {
                        email: ctx.body.email,
                    });
                    if (!user) return ctx.status('Not Found');

                    const attendanceCurrent = await appDataSource.manager.findOne(
                        AttendanceEntity,
                        {
                            where: { user_id: user._id },
                            order: { check_in: 'DESC' },
                        },
                    );
                    if (!attendanceCurrent) return ctx.status('Bad Request');

                    const before = { ...attendanceCurrent };

                    attendanceCurrent.check_out = now;
                    attendanceCurrent.updated_at = now;
                    const after = await appDataSource.manager.save(AttendanceEntity, attendanceCurrent);

                    await saveChangelog({
                        requester: { created_by: user._id, login: user.email },
                        action: CHANGELOG_ACTIONS.UPDATED,
                        resource: 'attendance',
                        resource_id: after._id,
                        before,
                        after,
                        changes: [{ field: 'check_out', from: null, to: now }],
                    });

                    ctx.status('OK');
                    return after;
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    email: t.String(),
                }),
            },
        );

        return app;
    },
);
