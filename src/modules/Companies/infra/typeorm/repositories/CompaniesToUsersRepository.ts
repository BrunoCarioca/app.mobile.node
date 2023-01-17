import { ICompany } from '@modules/Companies/domain/models/ICompany';
import { ICompaniesUsers } from '@modules/Companies/domain/models/ICompanyUser';
import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CompaniesUsers } from '../entities/CompanyUser';

export class CompaniesToUsersRepository implements ICompaniesToUsersRepository {
    private ormRepository: Repository<CompaniesUsers>;

    constructor() {
        this.ormRepository = dataSource.getRepository(CompaniesUsers);
    }

    public async findByCompanyId(id: string): Promise<ICompaniesUsers | null> {
        const companiesUsers = await this.ormRepository.findOne({
            where: {
                company: {
                    id: id,
                },
            },
        });

        return companiesUsers;
    }

    public async findByUserId(id: number): Promise<ICompaniesUsers | null> {
        const companiesUsers = await this.ormRepository.findOne({
            where: {
                user: {
                    id: id,
                },
            },
        });

        return companiesUsers;
    }

    public async findUsersByCompanyId(id: string): Promise<CompaniesUsers[] | null> {
        const companiesUsers = await this.ormRepository.find({
            relations: {
                user: true,
            },
            select: {
                id: false,
                role_user: true,
                user: {
                    id: true,
                    name: true,
                    email: true,
                    working: true,
                },
            },
            where: {
                company: {
                    id: id,
                },
            },
        });

        return companiesUsers;
    }

    public async findByCompanyIdAndUserId(
        userId: number,
        companyId: string,
    ): Promise<ICompaniesUsers | null> {
        const companiesUsers = await this.ormRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                company: {
                    id: companyId,
                },
            },
        });

        return companiesUsers;
    }

    public async findCompaniesByUserId(id: number): Promise<ICompaniesUsers[] | null> {
        const companiesUsers = await this.ormRepository.find({
            select: {
                role_user: false,
                created_at: false,
                updated_at: false,
            },
            relations: {
                company: true,
            },
            where: {
                user: {
                    id: id,
                },
            },
        });

        return companiesUsers;
    }

    public async save(companies_users: ICompaniesUsers): Promise<ICompaniesUsers> {
        const updateCompaniesUser = await this.ormRepository.save(companies_users);
        return updateCompaniesUser;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async create(
        user: IUser,
        company: ICompany,
        role_user: number,
    ): Promise<ICompaniesUsers> {
        const newUser = await this.ormRepository.create({
            company: company,
            user: user,
            role_user: role_user,
        });

        await this.ormRepository.save(newUser);

        return newUser;
    }
}