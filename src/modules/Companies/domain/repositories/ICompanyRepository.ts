import { ICompany } from '../models/ICompany';
import { IPaginateCompany } from '../models/ICompanyPaginator';
import { ICreateCompany } from '../models/ICreateCompany';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface ICompanyRepository {
    findAll({ page, skip, take }: SearchParams): Promise<IPaginateCompany>;
    findByCnpjCpf(cnpj_cpf: string): Promise<ICompany | null>;
    findById(id: string): Promise<ICompany | null>;
    findByCode(code: number): Promise<ICompany | null>;
    delete(id: string): Promise<void>;
    create({ cnpj_cpf, fantasia }: ICreateCompany): Promise<ICompany>;
    save(company: ICompany): Promise<ICompany>;
}
