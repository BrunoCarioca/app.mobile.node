import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { RefreshTokenRepository } from '@modules/users/infra/typeorm/repositories/RefreshTokenRepository';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    token: string;
}

export default async function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const autheHeader = request.headers.authorization;

    if (!autheHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = autheHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodeToken as TokenPayload;

        request.user = {
            id: sub,
        };

        const refreshTokenRepository = new RefreshTokenRepository();
        const refreshToken = await refreshTokenRepository.findByUserId(Number(sub));

        if (!refreshToken || refreshToken.token !== token) {
            throw new AppError('Invalid JWT Token.');
        }

        return next();
    } catch (e) {
        throw new AppError('Invalid JWT Token.');
    }
}
