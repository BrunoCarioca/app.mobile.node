import {
    IActivity,
    IActivityCreate,
    IPaginateActivity,
} from '@modules/activity/domain/models/IActivity';
import {
    IActivityRepository,
    SearchParams,
} from '@modules/activity/domain/repository/IActivityRepository';
import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Activity from '../entities/Activity';

export class ActivityRepository implements IActivityRepository {
    private ormRepository: Repository<Activity>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Activity);
    }

    public async create({
        activity,
        description,
        project,
        status,
        user,
    }: IActivityCreate): Promise<void> {
        const newActivity = await this.ormRepository.create({
            activity,
            description,
            project,
            status,
            user,
        });

        await this.ormRepository.save(newActivity);
    }

    public async save(activity: IActivity): Promise<void> {
        await this.ormRepository.save(activity);
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async findById(id: number, userId: number): Promise<IActivity | null> {
        const activity = await this.ormRepository.findOne({
            where: {
                id: id,
                user: {
                    id: userId,
                },
            },
        });
        return activity;
    }

    public async findByIdRelentions(id: number): Promise<IActivity | null> {
        const activity = await this.ormRepository.findOne({
            relations: {
                project: true,
                user: true,
            },
            where: {
                id: id,
            },
        });

        return activity;
    }

    public async findByProject(
        { page, skip, take }: SearchParams,
        project: Project,
    ): Promise<IPaginateActivity> {
        const [activities, count] = await this.ormRepository
            .createQueryBuilder()
            .where('id_project = :id', { id: project.id })
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: activities,
        };

        return result;
    }

    public async findByUser(
        { page, skip, take }: SearchParams,
        userId: number,
    ): Promise<IPaginateActivity> {
        const [activities, count] = await this.ormRepository
            .createQueryBuilder()
            .where('id_user = :id', { id: userId })
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: activities,
        };

        return result;
    }

    public async findByStatus(
        { page, skip, take }: SearchParams,
        status: boolean,
    ): Promise<IPaginateActivity> {
        const [activities, count] = await this.ormRepository
            .createQueryBuilder()
            .where('status = :status', { status })
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: activities,
        };

        return result;
    }

    public async findByUserIdProjectIdStatus(
        userId: number,
        projectId: string,
    ): Promise<IActivity | null> {
        const activity = await this.ormRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                project: {
                    id: projectId,
                },
                status: false,
            },
        });

        return activity;
    }

    public async findByUserIdStatus(userId: number, status: boolean): Promise<IActivity | null> {
        const activity = await this.ormRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                status: status,
            },
        });

        return activity;
    }
}
