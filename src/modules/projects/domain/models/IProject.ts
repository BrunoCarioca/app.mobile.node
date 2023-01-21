import { ICompany } from '@modules/Companies/domain/models/ICompany';
import { Company } from '@modules/Companies/infra/typeorm/entities/Company';

export interface IProject {
    id: string;
    name: string;
    admin: number;
    description: string;
    company: Company;
    created_at: Date;
    updated_at: Date;
}

export interface IPaginateProject {
    per_page: number;
    total: number;
    current_page: number;
    data: IProject[];
}

export interface ICreateProject {
    name: string;
    admin: number;
    description: string;
    company: ICompany;
}
