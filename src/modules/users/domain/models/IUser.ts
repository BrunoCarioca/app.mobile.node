import { ICompaniesUsers } from '@modules/Companies/domain/models/ICompanyUser';

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
}
