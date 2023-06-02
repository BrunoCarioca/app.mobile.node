import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';

export class SearchProjectsService {
    public constructor(
        private projectUsersRepository: IProjectUsersRepository,
    ) {}

    public async execute(name: string, userLoginId: number) {
        const searchProjects =
            await this.projectUsersRepository.searchByNameAndUserId(
                name,
                userLoginId,
            );

        return searchProjects;
    }
}
