import { BaseError } from './base_error';

export class ApiError<T> extends BaseError {
    constructor(message: string, code: string, status: number, error?: T, errors?: T[]) {
        super(message, code, status);
        this.error = error;
        this.errors = errors;
    }
}
