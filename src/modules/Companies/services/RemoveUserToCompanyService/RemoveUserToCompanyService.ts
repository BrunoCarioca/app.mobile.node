import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

interface IRemoveUsersParams {
    userLoginId: number;
    companyId: string;
    usersEmail: string[];
}

export class RemoveUserToCompanyService {
    constructor(
        private companiesToUsersRepository: ICompaniesToUsersRepository,
        private projectUsersRepository: IProjectUsersRepository,
    ) {}

    public async execute({
        companyId,
        usersEmail,
        userLoginId,
    }: IRemoveUsersParams) {
        const userLoginAreInCompany =
            await this.companiesToUsersRepository.findByCompanyIdAndUserId(
                userLoginId,
                companyId,
            );

        if (!userLoginAreInCompany) {
            throw new AppError('User not are in company!');
        }

        if (userLoginAreInCompany.role_user > 2) {
            throw new AppError('User not have permission!');
        }

        const userDeleteAreInProject =
            await this.projectUsersRepository.findByUserEmailAndCompanyId(
                usersEmail,
                companyId,
            );

        if (userDeleteAreInProject.length > 0) {
            throw new AppError('Can not remove user are in some Project');
        }

        const userIsCompanyOwner = userDeleteAreInProject.find(
            user_project => user_project.user.id === userLoginId,
        );

        if (userIsCompanyOwner) {
            throw new AppError('User is company CEO!');
        }

        const users =
            await this.companiesToUsersRepository.findAllByCompanyIdAndUserEmail(
                usersEmail,
                companyId,
            );
        await this.companiesToUsersRepository.delete(users);
    }
}
