import { DataSource } from 'typeorm';
import { dirname, join } from 'path';

const __filename = Bun.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_MIN_POOL } = Bun.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT || '5432'),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        join(
            __dirname,
            'src/models/*.{ts,js}',
        ),
    ],
    migrations: [
        join(__dirname, 'migrations/**/*.{ts,js}'),
    ],
    extra: {
        max: Number(DB_MIN_POOL!),
    },
    synchronize: false,
    migrationsRun: false,
    logging: true,
});