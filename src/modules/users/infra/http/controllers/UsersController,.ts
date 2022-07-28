import { CreateUserService } from '@modules/users/services/CreateUserService/CreateUserService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, name, password, role } = request.body;

        const usersRepository = new UsersRepository();
        const createUserService = new CreateUserService(usersRepository);

        const user = await createUserService.execute({
            email,
            name,
            password,
            role,
        });

        return response.status(200).json(user);
    }
}
