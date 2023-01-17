import { IProject } from '@modules/projects/domain/models/IProject';
import { ICompaniesUsers } from './ICompanyUser';

export type ISaveCompany = Omit<ICompany, 'companies_users'>;

export interface ICompany {
    id: string;
    fantasia: string;
    cnpj_cpf: string;
    logo: string;
    codigo: number;
    created_at: Date;
    updated_at: Date;
    companies_users: ICompaniesUsers[];
    projects: IProject[];
}
