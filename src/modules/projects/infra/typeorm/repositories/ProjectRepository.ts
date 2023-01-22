import {
    ICreateProject,
    IPaginateProject,
    IProject,
} from '@modules/projects/domain/models/IProject';
import {
    IProjectRepository,
    SearchParams,
} from '@modules/projects/domain/repositories/IProjectReposity';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project';

export class ProjectRepository implements IProjectRepository {
    private ormRepository: Repository<Project>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Project);
    }

    public async findAll({
        page,
        skip,
        take,
        company_id,
    }: SearchParams): Promise<IPaginateProject> {
        const [projects, count] = await this.ormRepository
            .createQueryBuilder()
            .where('company_id = :id', { id: company_id })
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: projects,
        };

        return result;
    }

    public async findByID(id: string): Promise<IProject | null> {
        const project = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return project;
    }

    public async findByName(name: string): Promise<IProject | null> {
        const project = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return project;
    }

    public async create({ name, admin, description, company }: ICreateProject): Promise<void> {
        const project = await this.ormRepository.create({
            name,
            company,
            admin,
            description,
        });

        await this.ormRepository.save(project);
    }

    public async save(project: IProject): Promise<void> {
        await this.ormRepository.save(project);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}
