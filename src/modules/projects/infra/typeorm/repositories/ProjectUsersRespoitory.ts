import {
    ICreateManyProjectsUsers,
    ICreateProjectsUsers,
    IProjectsUsers,
} from '@modules/projects/domain/models/IProjectsUsers';
import {
    IPaginateProjectUser,
    IProjectUsersReposity,
    SearchParams,
} from '@modules/projects/domain/repositories/IProjectUsersReposity';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ProjectsUsers } from '../entities/ProjectUser';

export class ProjectsUsersRepository implements IProjectUsersReposity {
    private ormRepository: Repository<ProjectsUsers>;

    constructor() {
        this.ormRepository = dataSource.getRepository(ProjectsUsers);
    }

    public async create({ user, project }: ICreateProjectsUsers): Promise<void> {
        const project_user = await this.ormRepository.create({
            user,
            project,
        });

        await this.ormRepository.save(project_user);
    }

    public async createMany({ users, project }: ICreateManyProjectsUsers): Promise<void> {
        const projects_users = await Promise.all(
            users.map(
                async user =>
                    await this.ormRepository.create({
                        user,
                        project,
                    }),
            ),
        );

        await this.ormRepository.save(projects_users);
    }

    public async save(projectUsers: IProjectsUsers): Promise<void> {
        await this.ormRepository.save(projectUsers);
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async findAll({ page, skip, take }: SearchParams): Promise<IPaginateProjectUser> {
        const [projects_users, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: projects_users,
        };

        return result;
    }

    public async findByProjectID(id: string): Promise<IProjectsUsers[] | null> {
        const projects_users = await this.ormRepository.find({
            relations: {
                user: true,
            },
            where: {
                project: {
                    id,
                },
            },
        });

        return projects_users;
    }

    public async findByUserID(id: number): Promise<IProjectsUsers[] | null> {
        const projects_users = await this.ormRepository.find({
            relations: {
                project: true,
            },
            where: {
                user: {
                    id,
                },
            },
        });

        return projects_users;
    }
}
