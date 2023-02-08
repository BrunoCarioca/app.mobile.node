import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';

export class ListProjectService {
    constructor(private projectsUsersRepository: IProjectUsersRepository) {}

    public async execute(userId: number) {
        return await this.projectsUsersRepository.findByUserID(userId);
    }
}
