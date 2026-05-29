import type { ErrorHandler } from 'elysia';
import { ApiError } from 'src/errors/api_error';
import { BaseError } from 'src/errors/base_error';

export const handleError: ErrorHandler = ({ error, code, status }) => {
    if (code === 'VALIDATION') {
        return Response.json(new ApiError(error.message, 'validation', error.status));
    }
    if (error instanceof ApiError || error instanceof BaseError) {
        status(error.status);
        return Response.json(error);
    }
    return error;
};
