import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import AppError from '@shared/errors/AppError';

export class CompanyUsersListService {
    constructor(private companiesUsersRepository: CompaniesToUsersRepository) {}

    public async execute(userId: number, companyId: string) {
        console.table({ userId, companyId });

        const companyUser = await this.companiesUsersRepository.findByCompanyIdAndUserId(
            userId,
            companyId,
        );

        if (!companyUser) {
            throw new AppError('Company not found');
        }

        const users = await this.companiesUsersRepository.findUsersByCompanyId(companyId);

        return users;
    }
}
