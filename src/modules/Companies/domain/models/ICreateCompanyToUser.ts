import { Company } from '@modules/Companies/infra/typeorm/entities/Company';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface ICompaniesUsers {
    id: number;
    user: User;
    company: Company;
    role_user: number;
}
