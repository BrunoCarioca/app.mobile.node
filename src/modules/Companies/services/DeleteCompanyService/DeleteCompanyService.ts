import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { ICompanyRepository } from '@modules/Companies/domain/repositories/ICompanyRepository';

export class DeleteCompanyService {
    constructor(
        private companiesToUsersRepository: ICompaniesToUsersRepository,
        private companyRepository: ICompanyRepository,
    ) {}

    public async execute(companyId: string, userId: number) {
        const userExitInCompany =
            await this.companiesToUsersRepository.findByCompanyIdAndUserId(
                userId,
                companyId,
            );

        if (!userExitInCompany) {
            throw new Error('User not exit in company!');
        }

        if (userExitInCompany.role_user > 1) {
            throw new Error('User not have permission!');
        }

        await this.companyRepository.delete(userExitInCompany.company.id);
    }
}
