import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import { AddUserProjectService } from '@modules/projects/services/AddUserProjectService/AddUserProjectServiceAddUserProjectService';
import { ListUserProjectService } from '@modules/projects/services/ListUserProjectService/ListUserProjectService';
import { RemoveUsersInProjectService } from '@modules/projects/services/RemoveUsersInProject/RemoveUsersInProjectService';
import { Request, Response } from 'express';
import { ProjectsUsersRepository } from '../../typeorm/repositories/ProjectUsersRespoitory';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

export class UserProjectController {
    public async addUserToProject(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { users, companyId } = request.body;
        const userId = Number(request.user.id);
        const { id } = request.params;

        const projectUsersRepository = new ProjectsUsersRepository();
        const usersCompanyRepository = new CompaniesToUsersRepository();

        const addUserProjectService = new AddUserProjectService(
            usersCompanyRepository,
            projectUsersRepository,
        );

        await addUserProjectService.execute({
            userId,
            projectId: id,
            users,
            companyId,
        });

        return response.status(200).json([]);
    }

    public async listUserInProject(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const userId = Number(request.user.id);

        const projectUsersRepository = new ProjectsUsersRepository();
        const listUserProjectService = new ListUserProjectService(
            projectUsersRepository,
        );
        const users = await listUserProjectService.execute({
            userId,
            projectId: id,
        });

        return response.status(200).json(users);
    }

    public async removeUserToProject(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { users } = request.body;
        const userId = Number(request.user.id);
        const { id } = request.params;

        const projectUsersRepository = new ProjectsUsersRepository();
        const removeUsersInProjectService = new RemoveUsersInProjectService(
            projectUsersRepository,
        );
        await removeUsersInProjectService.execute({
            userId,
            projectId: id,
            users,
        });

        return response.status(200).json([]);
    }
}
