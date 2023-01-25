import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import { CreateProjectService } from '@modules/projects/services/CreateProjectService';
import { Request, Response } from 'express';
import { ProjectRepository } from '../../typeorm/repositories/ProjectRepository';
import { ProjectsUsersRepository } from '../../typeorm/repositories/ProjectUsersRespoitory';

export class ProjectController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, description, users } = request.body;
        const { companyId } = request.params;
        const id = Number(request.user.id);

        const projectRepository = new ProjectRepository();
        const projectUsersRepository = new ProjectsUsersRepository();
        const usersCompaniesRepository = new CompaniesToUsersRepository();
        const crateProjectService = new CreateProjectService(
            projectRepository,
            projectUsersRepository,
            usersCompaniesRepository,
        );

        await crateProjectService.exec({ name, admin: id, description, company: companyId, users });

        return response.status(200).json([]);
    }
}
