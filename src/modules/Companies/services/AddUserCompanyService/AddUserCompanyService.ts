import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import { CompanyRepository } from '@modules/Companies/infra/typeorm/repositories/CompanyRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

export class AddUserCompanyService {
    constructor(
        private usersRepository: UsersRepository,
        private companyRepository: CompanyRepository,
        private companiesUsersRepository: CompaniesToUsersRepository,
    ) {}

    public async execute(
        userId: number,
        companyId: string,
        newUserEmail: string,
    ) {
        const companies_users =
            await this.companiesUsersRepository.findByCompanyIdAndUserId(
                userId,
                companyId,
            );

        if (!companies_users) {
            throw new AppError('User not In company!');
        }

        if (companies_users.role_user > 2) {
            throw new AppError('User not have permission!');
        }

        const user = await this.usersRepository.findByEmail(newUserEmail);

        if (!user) {
            throw new AppError('New User not exist!');
        }

        const companies_users_exist =
            await this.companiesUsersRepository.findByCompanyIdAndUserId(
                user.id,
                companyId,
            );

        if (companies_users_exist) {
            throw new AppError('User already join the company');
        }

        const res = await this.companiesUsersRepository.create(
            user,
            companies_users.company,
            3,
        );

        return res;
    }
}
