import { CompanyUsersListService } from '@modules/Companies/services/CompanyUsersListService/CompanyUsersListService';
import { Request, Response } from 'express';
import { CompaniesToUsersRepository } from '../../typeorm/repositories/CompaniesToUsersRepository';

export class CompanyUserController {
    public async listUserCompany(request: Request, response: Response): Promise<Response> {
        const userId = Number(request.user.id);
        const { id: companyId } = request.params;

        const companiesUsersReposiory = new CompaniesToUsersRepository();
        const companyUsersListService = new CompanyUsersListService(companiesUsersReposiory);
        const companyUsers = await companyUsersListService.execute(userId, companyId);

        return response.status(200).json(companyUsers);
    }
}
