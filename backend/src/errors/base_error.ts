export class BaseError<T = any> {
    message: string;
    code: string;
    status: number;
    error?: T;
    errors?: T[];

    constructor(message: string, code: string, status: number, error?: T, errors?: T[]) {
        this.message = message;
        this.code = code;
        this.status = status;
        this.error = error;
        this.errors = errors;
    }
}
