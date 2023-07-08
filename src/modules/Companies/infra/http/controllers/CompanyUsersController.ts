import { AddUserCompanyService } from '@modules/Companies/services/AddUserCompanyService/AddUserCompanyService';
import { CompanyUsersListService } from '@modules/Companies/services/CompanyUsersListService/CompanyUsersListService';
import { UserCompanyListService } from '@modules/Companies/services/UserCompanyListService/UserCompanyListService';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { CompaniesToUsersRepository } from '../../typeorm/repositories/CompaniesToUsersRepository';
import { CompanyRepository } from '../../typeorm/repositories/CompanyRepository';
import { RemoveUsersInProjectService } from '@modules/projects/services/RemoveUsersInProject/RemoveUsersInProjectService';
import { ProjectsUsersRepository } from '@modules/projects/infra/typeorm/repositories/ProjectUsersRespoitory';
import { RemoveUserToCompanyService } from '@modules/Companies/services/RemoveUserToCompanyService/RemoveUserToCompanyService';

export class CompanyUserController {
    public async listUsersCompany(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = Number(request.user.id);
        const { companyId } = request.params;

        const companiesUsersReposiory = new CompaniesToUsersRepository();
        const companyUsersListService = new CompanyUsersListService(
            companiesUsersReposiory,
        );
        const companyUsers = await companyUsersListService.execute(
            userId,
            companyId,
        );

        return response.status(200).json(companyUsers);
    }

    public async addUserToCompany(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = Number(request.user.id);
        const { companyId } = request.params;
        const { newUserEmail } = request.body;

        const usersRepository = new UsersRepository();
        const companyRepository = new CompanyRepository();
        const companiesUsersRepository = new CompaniesToUsersRepository();
        const addUserCompanyService = new AddUserCompanyService(
            usersRepository,
            companyRepository,
            companiesUsersRepository,
        );

        const res = await addUserCompanyService.execute(
            userId,
            companyId,
            newUserEmail,
        );

        return response.status(200).json(res);
    }

    public async listCompaniesUsers(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = Number(request.user.id);

        const companiesUsersRepository = new CompaniesToUsersRepository();
        const userCompanyListService = new UserCompanyListService(
            companiesUsersRepository,
        );

        const companyUsers = await userCompanyListService.execute(userId);

        return response.status(200).json(companyUsers);
    }

    public async removeUserFromCompany(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userLoginId = Number(request.user.id);
        const { companyId } = request.params;
        const { usersEmail } = request.body;

        const companiesUsersRepository = new CompaniesToUsersRepository();
        const projectsUsersRepository = new ProjectsUsersRepository();
        const removeUserToCompanyService = new RemoveUserToCompanyService(
            companiesUsersRepository,
            projectsUsersRepository,
        );

        await removeUserToCompanyService.execute({
            companyId,
            userLoginId,
            usersEmail,
        });
        return response.status(200).json([]);
    }
}
