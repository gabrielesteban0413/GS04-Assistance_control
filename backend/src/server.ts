import cors from '@elysiajs/cors';
import { Logger } from '@tools/logger';
import Elysia from 'elysia';
import openapi from '@elysiajs/openapi';
import { handleError } from './middlewares/hadle_error';

export const documentation = openapi({
    path: '/docs',
    documentation: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingresa tu token JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
});
const logger = new Logger();
const PORT = Bun.env.PORT || 6700;

export class Server {
    private app: Elysia;

    constructor() {
        this.app = new Elysia();
    }

    middlewares = async () => {
        const { pluginValidateSession } =
            await import('./middlewares/validation_session');
        this.app = this.app
            .use(documentation)
            .use(
                cors({
                    origin: '*',
                }),
            )
            .use(pluginValidateSession(['/auth/login', '/', '/health', '/readiness']))
            .onError(handleError)
            .onAfterHandle(({ responseValue: value }) => {
                if (value && typeof value === 'object' && !(value instanceof Response)) {
                    return Response.json(value);
                }
                return value;
            });
    };

    routes = async () => {
        const { routes } = await import('@routes/index');
        this.app = this.app.use(routes);
    };

    start = async () => {
        await this.middlewares();
        await this.routes();
        this.app.listen(PORT, ({ hostname, port }) => {
            logger.info(`Elysia server running in http://${hostname}:${port}`);
        });
    };
}
