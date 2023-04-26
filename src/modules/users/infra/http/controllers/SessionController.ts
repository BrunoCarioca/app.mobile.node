import { CreateSessionService } from '@modules/users/services/CreateSessionService/CreateSessionService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { RefreshTokenRepository } from '../../typeorm/repositories/RefreshTokenRepository';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';
import { ShowUserLoginService } from '@modules/users/services/ShowUserLoginService/ShowUserLoginService.ts/ShowUserLoginService';

export class SessionController {
    public async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const usersRepository = new UsersRepository();
        const refreshTokenRepository = new RefreshTokenRepository();
        const createSessionService = new CreateSessionService(
            usersRepository,
            refreshTokenRepository,
        );

        const { user, refreshToken } = await createSessionService.execute({
            email,
            password,
        });

        const userRes = instanceToInstance(user);

        return response.status(200).json({
            userRes,
            token: refreshToken.token,
            refresh_token: refreshToken.id,
        });
    }

    public async logout(request: Request, response: Response): Promise<Response> {
        const id = Number(request.user.id);

        const refreshTokenRepository = new RefreshTokenRepository();
        await refreshTokenRepository.delete(id);

        return response.status(200).json({ message: 'Logout successful.' });
    }

    public async me(request: Request, response: Response): Promise<Response> {
        const id = Number(request.user.id);

        const usersRepository = new UsersRepository();
        const showUserLoginService = new ShowUserLoginService(usersRepository);

        const user = await showUserLoginService.execute(id);

        return response.status(200).json(instanceToInstance(user));
    }
}
