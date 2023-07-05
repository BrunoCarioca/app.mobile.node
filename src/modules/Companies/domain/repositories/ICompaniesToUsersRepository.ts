import { IUser } from '@modules/users/domain/models/IUser';
import { ICompany } from '../models/ICompany';
import { ICompaniesUsers } from '../models/ICompanyUser';

export interface SearchCompany {
    companies: ICompaniesUsers[];
    count: number;
}

export interface ICompaniesToUsersRepository {
    findByUserId(id: number): Promise<ICompaniesUsers | null>;
    findCompaniesByUserId(id: number): Promise<ICompaniesUsers[] | null>;
    findByCompanyId(id: string): Promise<ICompaniesUsers | null>;
    findByCompanyIdAndUserId(
        userId: number,
        companyId: string,
    ): Promise<ICompaniesUsers | null>;
    findAllByCompanyIdAndUserEmail(
        usersEmail: string[],
        companyId: string,
    ): Promise<ICompaniesUsers[]>;
    findUsersByCompanyId(id: string): Promise<ICompaniesUsers[] | null>;
    create(
        user: IUser,
        company: ICompany,
        role_user: number,
    ): Promise<ICompaniesUsers>;
    save(companies_users: ICompaniesUsers): Promise<ICompaniesUsers>;
    delete(id: number): Promise<void>;
    findByFantasia(fantasia: string, user_id: number): Promise<SearchCompany>;
}
