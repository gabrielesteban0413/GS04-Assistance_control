import pino from 'pino';

export class Logger {
    private readonly logger: pino.Logger;

    constructor() {
        this.logger = pino();
    }

    info = (...args: any) => this.logger.info(args);
    warn = (...args: any) => this.logger.warn(args);
    error = (...args: any) => this.logger.error(args);
    debug = (...args: any) => this.logger.debug(args);
}