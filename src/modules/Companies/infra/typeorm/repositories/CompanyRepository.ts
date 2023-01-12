import { ICompany } from '@modules/Companies/domain/models/ICompany';
import { IPaginateCompany } from '@modules/Companies/domain/models/ICompanyPaginator';
import { ICreateCompany } from '@modules/Companies/domain/models/ICreateCompany';
import {
    ICompanyRepository,
    SearchParams,
} from '@modules/Companies/domain/repositories/ICompanyRepository';
import { dataSource } from '@shared/infra/typeorm';
import { instanceToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Company } from '../entities/Company';

export class CompanyRepository implements ICompanyRepository {
    private ormRepository: Repository<Company>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Company);
    }

    public async findAll({ page, skip, take }: SearchParams): Promise<IPaginateCompany> {
        const [companies, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: instanceToInstance(companies),
        };

        return result;
    }

    public async findByCnpjCpf(cnpj_cpf: string): Promise<ICompany | null> {
        const company = await this.ormRepository.findOneBy({
            cnpj_cpf,
        });

        return company;
    }

    public async findById(id: string): Promise<ICompany | null> {
        const company = await this.ormRepository.findOneBy({
            id,
        });

        return company;
    }

    public async create({ cnpj_cpf, fantasia, codigo }: ICreateCompany): Promise<ICompany> {
        const company = await this.ormRepository.create({
            cnpj_cpf,
            fantasia,
            codigo,
        });

        await this.ormRepository.save(company);

        return company;
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async save(company: ICompany): Promise<ICompany> {
        const updateCompany = await this.ormRepository.save(company);
        return updateCompany;
    }

    public async findByCode(code: number): Promise<ICompany | null> {
        const company = await this.ormRepository.findOneBy({ codigo: code });
        return company;
    }
}
