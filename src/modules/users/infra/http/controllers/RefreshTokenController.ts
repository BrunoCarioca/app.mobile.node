import { RefreshTokenRefreshService } from '@modules/users/services/RefreshToken/RefreshTokenRefreshService';
import { Request, Response } from 'express';
import { RefreshTokenRepository } from '../../typeorm/repositories/RefreshTokenRepository';

export class RefreshTokenController {
    public async refresh(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const refresh_token = request.body.refresh_token;

        const refreshTokenRepository = new RefreshTokenRepository();
        const refreshTokenService = new RefreshTokenRefreshService(
            refreshTokenRepository,
        );

        const newtoken = await refreshTokenService.execute(refresh_token);

        return response.status(200).json(newtoken);
    }
}
