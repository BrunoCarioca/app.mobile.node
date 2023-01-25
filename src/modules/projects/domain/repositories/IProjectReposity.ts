import { ICreateProject, IPaginateProject, IProject } from '../models/IProject';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
    company_id: string;
};

export interface IProjectRepository {
    findAll({ page, skip, take, company_id }: SearchParams): Promise<IPaginateProject>;
    findByName(name: string): Promise<IProject | null>;
    findByID(id: string): Promise<IProject | null>;
    create({ name, admin, description, company }: ICreateProject): Promise<IProject>;
    save(project: IProject): Promise<void>;
    delete(id: string): Promise<void>;
}
