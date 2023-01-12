import { ICompaniesUsers } from '@modules/Companies/domain/models/ICompanyUser';
import { CompaniesToUsersRepository } from '@modules/Companies/infra/typeorm/repositories/CompaniesToUsersRepository';
import { CompanyRepository } from '@modules/Companies/infra/typeorm/repositories/CompanyRepository';
import { codigoRandom } from '@modules/Companies/providers/CodigoRandom';
import { validateCnpj, validateCpf } from '@modules/Companies/providers/validateCpfCnpj';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface ICompanyCreate {
    cnpj_cpf: string;
    fantasia: string;
    userId: number;
}

export class CompanyCreateService {
    constructor(
        private usersRepository: UsersRepository,
        private companyRepository: CompanyRepository,
        private companiesUsersRepository: CompaniesToUsersRepository,
    ) {}

    public async execute({ cnpj_cpf, fantasia, userId }: ICompanyCreate): Promise<ICompaniesUsers> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('user not found');
        }

        if (cnpj_cpf.length < 14 && !validateCpf(cnpj_cpf)) {
            throw new AppError('cpf is not valid');
        }

        if (cnpj_cpf.length === 14 && !validateCnpj(cnpj_cpf)) {
            throw new AppError('cnpj is not valid');
        }

        const companyExist = await this.companyRepository.findByCnpjCpf(cnpj_cpf);
        //console.log(companyExist);

        if (companyExist) {
            throw new AppError('Company already exist');
        }

        let code: number;
        let codeExist = true;

        do {
            code = codigoRandom();
            const companyCodeExist = await this.companyRepository.findByCode(code);
            if (!companyCodeExist) {
                codeExist = false;
            }
        } while (codeExist);

        const company = await this.companyRepository.create({ cnpj_cpf, fantasia, codigo: code });
        const companies_users = await this.companiesUsersRepository.create(user, company, 1);

        return companies_users;
    }
}
