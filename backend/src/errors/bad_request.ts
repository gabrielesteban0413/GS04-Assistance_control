import { BaseError } from './base_error';

export class ErrorBadRequest<T> extends BaseError {
    constructor(message: string, error?: T, errors?: T[]) {
        super(message, 'bad', 400);
        this.error = error;
        this.errors = errors;
    }
}
