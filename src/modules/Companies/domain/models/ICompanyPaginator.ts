import { ICompany } from './ICompany';

export interface IPaginateCompany {
    per_page: number;
    total: number;
    current_page: number;
    data: ICompany[];
}

export interface IListCompany {
    page: number;
    limit: number;
}
