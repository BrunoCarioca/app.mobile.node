import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';

export class ListProjectService {
    constructor(private projectsUsersRepository: IProjectUsersRepository) {}

    public async execute(userId: number, { page, limit }: { page: number; limit: number }) {
        const skip = (page - 1) * limit;
        return await this.projectsUsersRepository.findByUserID(userId, { page, skip, take: limit });
    }
}
