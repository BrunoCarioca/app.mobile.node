import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    token: string;
}

export default function isRefreshToken(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const autheHeader = request.headers.authorization;
    console.log(autheHeader);

    if (!autheHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = autheHeader.split(' ');

    try {
        verify(token, authConfig.jwt.secret);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            return next();
        }
    }
    throw new AppError('Invalid JWT Token.');
}
