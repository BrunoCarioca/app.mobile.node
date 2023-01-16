import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';

export class UserCompanyListService {
    constructor(private companiesUserRepository: CompaniesToUsersRepository) {}

    public async execute(userId: number) {
        const companies_users = this.companiesUserRepository.findCompaniesByUserId(userId);

        return companies_users;
    }
}
