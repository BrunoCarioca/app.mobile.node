import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IActivity, IActivityCreate, IPaginateActivity } from '../models/IActivity';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IActivityRepository {
    //findAll({ page, skip, take }: SearchParams): Promise<IPaginateActivity>;
    findById(id: number, userId: number): Promise<IActivity | null>;
    findByIdRelentions(id: number): Promise<IActivity | null>;
    findByProject({ page, skip, take }: SearchParams, project: Project): Promise<IPaginateActivity>;
    findByUser({ page, skip, take }: SearchParams, userId: number): Promise<IPaginateActivity>;
    findByStatus({ page, skip, take }: SearchParams, status: boolean): Promise<IPaginateActivity>;
    findByUserIdProjectIdStatus(userId: number, projectId: string): Promise<IActivity | null>;
    create({ activity, description, project, status, user }: IActivityCreate): Promise<void>;
    delete(id: number): Promise<void>;
    save(activity: IActivity): Promise<void>;
}
