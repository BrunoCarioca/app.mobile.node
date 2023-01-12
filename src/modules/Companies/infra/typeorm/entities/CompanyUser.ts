import { ICompaniesUsers } from '@modules/Companies/domain/models/ICompanyUser';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './Company';

@Entity('companies_users')
export class CompaniesUsers implements ICompaniesUsers {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, user => user.companies_users)
    @JoinColumn({ name: 'id_usuario' })
    user: User;

    @ManyToOne(() => Company, company => company.companies_users)
    @JoinColumn({ name: 'id_company' })
    company: Company;

    @Column()
    role_user: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
