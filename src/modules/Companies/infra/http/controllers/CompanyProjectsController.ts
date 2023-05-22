import { ListCompanyProjectsService } from '@modules/Companies/services/ListCompanyProjectsService/ListCompanyProjectsService';
import { Request, Response } from 'express';
import { CompaniesToUsersRepository } from '../../typeorm/repositories/CompaniesToUsersRepository';
import { ProjectRepository } from '@modules/projects/infra/typeorm/repositories/ProjectRepository';

export class CompanyProjectsController {
    public async listCompaniesProjects(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;
        const { id } = request.params;
        const userLoginId = Number(request.user.id);

        const companyUserRepository = new CompaniesToUsersRepository();
        const projectsRepository = new ProjectRepository();
        const listCompanyProjectsService = new ListCompanyProjectsService(
            companyUserRepository,
            projectsRepository,
        );

        const projects = await listCompanyProjectsService.execute({
            companyId: id,
            userId: userLoginId,
            page,
            limit,
        });

        return response.status(200).json(projects);
    }
}
