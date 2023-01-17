import { ICompaniesUsers } from '@modules/Companies/domain/models/ICompanyUser';
import { IProjectsUsers } from '@modules/projects/domain/models/IProjectsUsers';

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    working: boolean;
    created_at: Date;
    updated_at: Date;
    avatar: string;
    getAvatarUrl(): string | null;
    companies_users: ICompaniesUsers[];
    projects_users: IProjectsUsers[];
}
