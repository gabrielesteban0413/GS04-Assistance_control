import { BaseError } from './base_error';

export class ErrorResourceNotFound extends BaseError {
    constructor(message: string) {
        super(message, 'not_found', 404);
    }
}
