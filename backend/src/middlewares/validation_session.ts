import { jwtTool } from '@tools/jwt';
import Elysia from 'elysia';
import { JWTExpired } from 'jose/errors';
import { ErrorBadRequest } from 'src/errors/bad_request';
import { BaseError } from 'src/errors/base_error';

export const pluginValidateSession = (excludePaths: string[]) => {
    return new Elysia({ name: 'validate-session' }).resolve(
        { as: 'scoped' },
        async ({ request, headers, ...ctx }) => {
            try {
                // Exclude routes
                const path = new URL(request.url).pathname;
                if (excludePaths.includes(path)) return {};

                // Validate header
                const { authorization } = headers;
                if (!authorization) {
                    throw new ErrorBadRequest('Token is required');
                }

                // Validate token
                const [_, token] = authorization.split('Bearer ');
                const payload = await jwtTool.verify(token!);

                // Add payload in store
                ctx.store = { payload };
                return {
                    store: ctx.store,
                    query: ctx.query,
                };
            } catch (error) {
                if (error instanceof JWTExpired) {
                    throw new BaseError('Token expired', 'unauthorized', 403);
                }
                throw new BaseError('Invalid Token', 'unauthorized', 403);
            }
        },
    );
};
