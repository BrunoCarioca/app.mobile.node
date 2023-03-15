import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import { CreateProjectService } from '@modules/projects/services/CreateProjectService/CreateProjectService';
import { ListProjectService } from '@modules/projects/services/ListProjectService/ListProjectService';
import { ProjectDeleteService } from '@modules/projects/services/ProjectDeleteService/ProjectDeleteService';
import { ProjectUpdateService } from '@modules/projects/services/ProjectUpdateService/ProjectUpdateService';
import { ShowProjectService } from '@modules/projects/services/ShowProjectService/ShowProjectService';
import { Request, Response } from 'express';
import { ProjectRepository } from '../../typeorm/repositories/ProjectRepository';
import { ProjectsUsersRepository } from '../../typeorm/repositories/ProjectUsersRespoitory';

export class ProjectController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, description, users, companyId } = request.body;
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

    public async list(request: Request, response: Response): Promise<Response> {
        const userId = Number(request.user.id);
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;

        const projectUsersRepository = new ProjectsUsersRepository();

        const listProjectService = new ListProjectService(projectUsersRepository);
        const listProject = await listProjectService.execute(userId, { page, limit });

        return response.status(200).json(listProject);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { projectId } = request.params;
        const userId = Number(request.user.id);

        const projectsUsersRepository = new ProjectsUsersRepository();
        const showProjectService = await new ShowProjectService(projectsUsersRepository);
        const project = await showProjectService.execute(userId, projectId);

        return response.status(200).json(project);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const { projectId } = request.params;
        const userId = Number(request.user.id);

        const projectRepository = new ProjectRepository();
        const projectUpdateService = new ProjectUpdateService(projectRepository);
        await projectUpdateService.execute({ name, description, projectId, userId });

        return response.status(200).json([]);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { projectId } = request.params;
        const userId = Number(request.user.id);

        const projectRepository = new ProjectRepository();
        const projectDeleteService = new ProjectDeleteService(projectRepository);

        await projectDeleteService.execute(projectId, userId);

        return response.status(200).json([]);
    }
}
