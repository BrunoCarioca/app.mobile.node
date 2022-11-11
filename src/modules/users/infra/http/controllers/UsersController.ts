import { CreateUserService } from '@modules/users/services/CreateUserService/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService/DeleteUserService';
import { ListUserService } from '@modules/users/services/ListUserService/ListUserService';
import { ShowUserService } from '@modules/users/services/ShowUserService/ShowUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService/UpdateUserService';
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

    public async update(request: Request, response: Response) {
        const { email, name } = request.body;
        const id = Number(request.params.id);

        const usersRepository = new UsersRepository();
        const updateUserService = new UpdateUserService(usersRepository);

        const user = await updateUserService.execute(id, name, email);

        return response.status(200).json(user);
    }

    public async show(request: Request, response: Response) {
        const id = Number(request.params.id);

        console.log(id);
        const usersRepository = new UsersRepository();
        const showUserService = new ShowUserService(usersRepository);

        const user = await showUserService.execute(id);

        return response.status(200).json(user);
    }

    public async delete(request: Request, response: Response) {
        const id = Number(request.params.id);

        const usersRepository = new UsersRepository();
        const deleteUserService = new DeleteUserService(usersRepository);

        await deleteUserService.execute(id);

        return response.status(200).json([]);
    }
}
