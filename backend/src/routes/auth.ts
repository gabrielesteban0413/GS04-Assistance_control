import { datetimeTool } from '@tools/datetime';
import { jwtTool } from '@tools/jwt';
import { PasswordSecurity, passwordSecurityTool } from '@tools/password_security';
import { uuidTool } from '@tools/uuid';
import Elysia, { t } from 'elysia';
import { appDataSource } from 'src/db/client';
import { ErrorBadRequest } from 'src/errors/bad_request';
import { AttendanceEntity } from 'src/models/attendance';
import { ScheduleEntity } from 'src/models/schedule';
import { UserEntity } from 'src/models/user';
import { UserCredentialEntity } from 'src/models/user_credential';
import { DataSource, IsNull } from 'typeorm';

export const authRoutes = new Elysia();

authRoutes.group(
    '/auth',
    {
        detail: { tags: ['Auth'] },
    },
    (app) => {
        app.post(
            '/login',
            async (ctx) => {
                try {
                    const now = datetimeTool.now();
                    const userFind = await appDataSource.manager.findOneBy(UserEntity, {
                        email: ctx.body.email,
                    });
                    if (!userFind) return ctx.status('Not Found');
                    const credentials = await appDataSource.manager.findOneBy(
                        UserCredentialEntity,
                        {
                            user_id: userFind._id,
                        },
                    );
                    if (!credentials) return ctx.status('Not Found');
                    const check = await passwordSecurityTool.verify(
                        ctx.body.password,
                        credentials?.password,
                    );
                    if (!check) {
                        ctx.status('Bad Request');
                        return new ErrorBadRequest('Incorrect Password');
                    }
                    const schedule = await appDataSource.manager.findOne(ScheduleEntity, {
                        where: { users: { _id: userFind._id } },
                        order: { created_at: 'DESC' },
                    });

                    const attendanceOut = await appDataSource.manager.findOneBy(
                        AttendanceEntity,
                        {
                            check_out: IsNull(),
                        },
                    );
                    if (attendanceOut) return ctx.status('Bad Request');

                    const result = appDataSource.manager.create(AttendanceEntity, {
                        _id: uuidTool.create(),
                        user_id: userFind._id,
                        schedule_id: schedule?._id ?? null,
                        check_in: now,
                        check_out: null,
                        created_at: now,
                        updated_at: now,
                    });
                    await appDataSource.manager.save(AttendanceEntity, result);

                    return {
                        user: userFind,
                        token: await jwtTool.create({
                            userId: userFind._id,
                            userRole: userFind.role,
                        }),
                    };
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    email: t.String(),
                    password: t.String(),
                }),
            },
        );

        return app;
    },
);
