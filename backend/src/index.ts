import { Logger } from '@tools/logger';
import { connectDB } from './db/client';
import { Server } from './server';

// Variables of DB
const {
    // DB
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_MIN_POOL,
    DB_MAX_POOL,
} = Bun.env;

const logger = new Logger();
const server = new Server();

try {
    await connectDB({
        host: DB_HOST!,
        port: Number(DB_PORT!),
        database: DB_NAME!,
        username: DB_USER!,
        password: DB_PASSWORD!,
        minPoolSize: Number(DB_MIN_POOL!),
        maxPoolSize: Number(DB_MAX_POOL!),
    });

    await server.start();
} catch (error: any) {
    console.error('Error init server', { error });
}
