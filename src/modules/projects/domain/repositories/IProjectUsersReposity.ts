import {
    ICreateManyProjectsUsers,
    ICreateProjectsUsers,
    IProjectsUsers,
} from '../models/IProjectsUsers';

export interface IPaginateProjectUser {
    per_page: number;
    total: number;
    current_page: number;
    data: IProjectsUsers[];
}

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IProjectUsersRepository {
    findByUserIdAndProjectId(userId: number, projectId: string): Promise<IProjectsUsers | null>;
    findByUserID(
        id: number,
        { page, skip, take }: SearchParams,
    ): Promise<IPaginateProjectUser | null>;
    findByUserAllIdsProjectId(ids: number[], projectId: string): Promise<IProjectsUsers[] | null>;
    findByProjectID(id: string): Promise<IProjectsUsers[] | null>;
    findAll({ page, skip, take }: SearchParams): Promise<IPaginateProjectUser>;
    create({ user, project }: ICreateProjectsUsers): Promise<void>;
    createMany({ users, project }: ICreateManyProjectsUsers): Promise<void>;
    save(projectUsers: IProjectsUsers): Promise<void>;
    delete(id: number): Promise<void>;
    deleteUsers(ids: number[]): Promise<void>;
}
