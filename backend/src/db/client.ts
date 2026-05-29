import { Logger } from '@tools/logger';
import { DataSource } from 'typeorm';

type TConnect = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    minPoolSize: number;
    maxPoolSize: number;
};

const logger = new Logger();

export let appDataSource: DataSource;

export const connectDB = async ({ minPoolSize, maxPoolSize, ...connection }: TConnect) => {
    const client = new DataSource({
        type: 'postgres',
        ...connection,
        extra: {
            // Min connections lives
            min: minPoolSize,
            // Max connections simulta
            max: maxPoolSize,
            // Disconnects after 30s inactivity
            idleTimeoutMillis: 30_000,
            // Total timeout by query
            statement_timeout: 30_000,
            // Kill transactions inactive
            idle_in_transaction_session_timeout: 30_000,
        },
        synchronize: false,
        migrationsRun: false,
        logging: false,
        entities: [`${__dirname}/../models/*.ts`],
    });

    appDataSource = await client.initialize();
    logger.info(`Connected with ${connection.database}`);
};