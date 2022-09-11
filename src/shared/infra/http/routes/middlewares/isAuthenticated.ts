import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    token: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const autheHeader = request.headers.authorization;

    if (!autheHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = autheHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);

        console.log(decodeToken);

        const { sub } = decodeToken as TokenPayload;

        request.user = {
            id: sub,
        };

        return;

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}
