import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IPaginateProject } from '@modules/projects/domain/models/IProject';
import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import AppError from '@shared/errors/AppError';

interface IListCompanyProjectsService {
    companyId: string;
    userId: number;
    page: number;
    limit: number;
}

export class ListCompanyProjectsService {
    public constructor(
        private companyUsersRepository: ICompaniesToUsersRepository,
        private projectsRepository: IProjectRepository,
    ) {}

    public async execute({
        companyId,
        userId,
        page,
        limit,
    }: IListCompanyProjectsService): Promise<IPaginateProject> {
        const company =
            await this.companyUsersRepository.findByCompanyIdAndUserId(
                userId,
                companyId,
            );

        if (!company) {
            throw new AppError('Company not found');
        }

        const skip = (page - 1) * limit;

        const projects = await this.projectsRepository.findAll({
            company_id: companyId,
            page,
            skip,
            take: limit,
        });

        return projects;
    }
}
