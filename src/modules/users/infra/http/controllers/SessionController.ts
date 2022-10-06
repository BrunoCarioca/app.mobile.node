import { CreateSessionService } from '@modules/users/services/CreateSessionService/CreateSessionService';
import { RefreshTokenCreateService } from '@modules/users/services/RefreshTokenCreate/RefreshTokenCreateService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { RefreshTokenRepository } from '../../typeorm/repositories/RefreshTokenRepository';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class SessionController {
    public async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = new UsersRepository();
        const createSessionService = new CreateSessionService(usersRepository);

        const { user, token } = await createSessionService.execute({
            email,
            password,
        });

        const refreshTokenRepository = new RefreshTokenRepository();
        const refreshtokenCreateService = new RefreshTokenCreateService(refreshTokenRepository);

        const { id: refresh_token } = await refreshtokenCreateService.execute(user);

        const userRes = instanceToInstance(user);

        return response.status(200).json({
            user: userRes,
            token,
            refresh_token,
        });
    }
}
