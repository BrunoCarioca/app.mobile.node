import { ICreateProjectsUsers, IProjectsUsers } from '../models/IProjectsUsers';

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

export interface IProjectUsersReposity {
    findByUserID(id: number): Promise<IProjectsUsers[] | null>;
    findByProjectID(id: string): Promise<IProjectsUsers[] | null>;
    findAll({ page, skip, take }: SearchParams): Promise<IPaginateProjectUser>;
    create({ user, project }: ICreateProjectsUsers): Promise<void>;
    save(projectUsers: IProjectsUsers): Promise<void>;
    delete(id: number): Promise<void>;
}
