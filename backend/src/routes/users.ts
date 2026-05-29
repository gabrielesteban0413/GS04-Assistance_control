import Elysia, { t } from 'elysia';
import { appDataSource } from '../db/client';
import { USER_DEPARTMENTS, USER_ROLES, USER_STATUSES, UserEntity } from '../models/user';
import { datetimeTool } from '@tools/datetime';
import { uuidTool } from '@tools/uuid';
import { UserCredentialEntity } from 'src/models/user_credential';
import { passwordSecurityTool } from '@tools/password_security';
import { ErrorBadRequest } from 'src/errors/bad_request';
import { CHANGELOG_ACTIONS } from 'src/models/changelog';
import { computeChanges, getRequester, saveChangelog } from '@tools/changelog';

export const userRoutes = new Elysia();

userRoutes.group(
    '/users',
    {
        detail: { tags: ['Users'] },
    },
    (app) => {
        app.get('/', async () => {
            try {
                return await appDataSource.manager.find(UserEntity);
            } catch (error) {
                return error;
            }
        });

        app.post(
            '/',
            async (ctx) => {
                try {
                    const isSecure = await passwordSecurityTool.isSecure(ctx.body.password);
                    if (!isSecure) return new ErrorBadRequest('Password not secure');

                    const result = appDataSource.manager.create(UserEntity, {
                        ...ctx.body,
                        _id: uuidTool.create(),
                        created_at: datetimeTool.now(),
                        updated_at: datetimeTool.now(),
                        deleted_at: null,
                    });
                    const user = await appDataSource.manager.save(UserEntity, result);

                    const credential = appDataSource.manager.create(UserCredentialEntity, {
                        _id: uuidTool.create(),
                        user_id: user._id,
                        password: await passwordSecurityTool.hash(ctx.body.password),
                        created_at: datetimeTool.now(),
                        updated_at: datetimeTool.now(),
                    });
                    await appDataSource.manager.save(UserCredentialEntity, credential);

                    const requester = await getRequester(ctx.headers.authorization);
                    await saveChangelog({
                        requester,
                        action: CHANGELOG_ACTIONS.CREATED,
                        resource: 'user',
                        resource_id: user._id,
                        before: null,
                        after: user,
                    });

                    ctx.status('Created');
                    return user;
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    first_name: t.String(),
                    last_name: t.String(),
                    email: t.String(),
                    role: t.Enum(USER_ROLES),
                    status: t.Enum(USER_STATUSES),
                    department: t.Enum(USER_DEPARTMENTS),
                    password: t.String(),
                }),
            },
        );

        app.patch(
            '/:id',
            async (ctx) => {
                try {
                    const before = await appDataSource.manager.findOneBy(UserEntity, {
                        _id: ctx.params.id,
                    });

                    await appDataSource.manager.update(UserEntity, ctx.params.id, {
                        ...ctx.body,
                        updated_at: datetimeTool.now(),
                    });

                    const after = await appDataSource.manager.findOneBy(UserEntity, {
                        _id: ctx.params.id,
                    });

                    const requester = await getRequester(ctx.headers.authorization);
                    await saveChangelog({
                        requester,
                        action: CHANGELOG_ACTIONS.UPDATED,
                        resource: 'user',
                        resource_id: ctx.params.id,
                        before,
                        after,
                        changes: before && after
                            ? computeChanges(
                                  before as unknown as Record<string, unknown>,
                                  ctx.body as Record<string, unknown>,
                              )
                            : null,
                    });

                    return after;
                } catch (error) {
                    return error;
                }
            },
            {
                body: t.Object({
                    first_name: t.String(),
                    last_name: t.String(),
                    email: t.String(),
                    role: t.Enum(USER_ROLES),
                    status: t.Enum(USER_STATUSES),
                    department: t.Enum(USER_DEPARTMENTS),
                }),
            },
        );

        app.delete('/:id', async (ctx) => {
            try {
                const before = await appDataSource.manager.findOneBy(UserEntity, {
                    _id: ctx.params.id,
                });

                const result = await appDataSource.manager.update(UserEntity, ctx.params.id, {
                    deleted_at: datetimeTool.now(),
                });

                const requester = await getRequester(ctx.headers.authorization);
                await saveChangelog({
                    requester,
                    action: CHANGELOG_ACTIONS.DELETED,
                    resource: 'user',
                    resource_id: ctx.params.id,
                    before,
                    after: null,
                });

                return result;
            } catch (error) {
                return error;
            }
        });

        return app;
    },
);
