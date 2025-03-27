import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

import createHttpError from 'http-errors';
import { verify } from 'jsonwebtoken';
import { config } from '../config/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createHttpError(401, 'Access denied. No token provided.'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, config.jwtSecret as string);
        req.user = decoded as any;
        next();
    } catch (error) {
        next(createHttpError(401, 'Invalid token.'));
    }
};

export default authMiddleware;