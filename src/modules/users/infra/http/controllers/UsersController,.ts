import { CreateUserService } from '@modules/users/services/CreateUserService/CreateUserService';
import { ListUserService } from '@modules/users/services/ListUserService/ListUserService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, name, password } = request.body;

        const usersRepository = new UsersRepository();
        const createUserService = new CreateUserService(usersRepository);

        await createUserService.execute({
            email,
            name,
            password,
        });

        return response.status(200).json([]);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;

        const usersRepository = new UsersRepository();
        const listUserService = new ListUserService(usersRepository);

        const paginateUser = await listUserService.execute({ page, limit });

        return response.status(200).json(paginateUser);
    }
}
