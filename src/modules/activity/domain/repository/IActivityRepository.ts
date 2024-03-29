import { Project } from '@modules/projects/infra/typeorm/entities/project';
import {
    IActivity,
    IActivityCreate,
    IPaginateActivity,
} from '../models/IActivity';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export type SearchActivityByUser = {
    activities: IActivity[];
    count: number;
};

export interface IActivityRepository {
    findByOnlyActivityId(id: number): Promise<IActivity | null>;
    findById(id: number, userId: number): Promise<IActivity | null>;
    findByUserIdStatus(
        userId: number,
        status: boolean,
    ): Promise<IActivity | null>;
    findByIdRelentions(id: number): Promise<IActivity | null>;
    findByProject(
        { page, skip, take }: SearchParams,
        project: Project,
    ): Promise<IPaginateActivity>;
    findByUser(
        { page, skip, take }: SearchParams,
        userId: number,
    ): Promise<IPaginateActivity>;
    findByStatus(
        { page, skip, take }: SearchParams,
        status: boolean,
    ): Promise<IPaginateActivity>;
    findByUserIdProjectIdStatus(userId: number): Promise<IActivity | null>;
    findActivityLastDate(
        userId: number,
        date: Date,
    ): Promise<IActivity[] | null>;
    create({
        activity,
        description,
        project,
        status,
        user,
    }: IActivityCreate): Promise<void>;
    delete(id: number): Promise<void>;
    save(activity: IActivity): Promise<void>;
    searchByProjectId(
        activity: string,
        project: Project,
    ): Promise<SearchActivityByUser | null>;
    searchByUserId(
        activity: string,
        userId: number,
    ): Promise<SearchActivityByUser | null>;
}
