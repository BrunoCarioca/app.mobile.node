import { IProjectUsersReposity } from '@modules/projects/domain/repositories/IProjectUsersReposity';

export class ListProjectService {
    constructor(private projectsUsersRepository: IProjectUsersReposity) {}

    public async execute(userId: number) {
        return await this.projectsUsersRepository.findByUserID(userId);
    }
}
