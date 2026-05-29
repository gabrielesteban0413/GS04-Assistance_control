import Elysia from 'elysia';
import { name, version } from 'package.json';

const env = Bun.env.NODE_ENV || 'dev';

type THealthy = {
    message: string;
    environment: string;
    version: string;
};

const healthy: THealthy = {
    message: `${name} OK 💪`,
    environment: env,
    version: version,
};

export const routerHealthy = new Elysia();

routerHealthy.get('/', () => healthy);
routerHealthy.get('/health', () => healthy);
routerHealthy.get('/readiness', () => healthy);
