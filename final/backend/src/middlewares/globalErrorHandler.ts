import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { config } from '../config/config';

const globalErrorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === 'development' ? err.stack : ''

    });
};

export default globalErrorHandler;
//  create a globalErrorHandler middleware that will handle all the errors that are thrown in the application.
//  used the HttpError type from the http-errors package to define the type of the error object.