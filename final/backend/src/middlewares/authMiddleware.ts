import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { verify } from 'jsonwebtoken';
import { config } from '../config/config';

interface IUser {

}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createHttpError(401, 'Access denied. No token provided.'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, config.jwtSecret as string);
        req.user = decoded as any;
        // console.log("req.user : ", req.user);
        next();
    } catch (error) {
        next(createHttpError(401, 'Invalid token.'));
    }
};

export default authMiddleware;

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}
