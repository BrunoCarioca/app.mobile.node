import { CompanyCreateService } from '@modules/Companies/services/CompanyCreateService/CompanyCreateService';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { CompaniesToUsersRepository } from '../../typeorm/repositories/CompaniesToUsersRepository';
import { CompanyRepository } from '../../typeorm/repositories/CompanyRepository';
import { SearchCompanyService } from '@modules/Companies/services/SearchCompanyService/SearchCompanyService';

export class CompanyController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { cnpj_cpf, fantasia } = request.body;
        const userId = Number(request.user.id);

        const usersRepository = new UsersRepository();
        const companyRepository = new CompanyRepository();
        const companiesUsersRepository = new CompaniesToUsersRepository();

        const companyCreateService = new CompanyCreateService(
            usersRepository,
            companyRepository,
            companiesUsersRepository,
        );

        const companies = await companyCreateService.execute({
            cnpj_cpf,
            fantasia,
            userId,
        });

        return response.status(201).json(companies);
    }

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { fantasia } = request.query;
        const userLoginId = Number(request.user.id);

        const companyRepository = new CompaniesToUsersRepository();
        const searchCompanyService = new SearchCompanyService(
            companyRepository,
        );

        const companies = await searchCompanyService.execute(
            fantasia as string,
            userLoginId,
        );

        return response.status(200).json(companies);
    }
}
