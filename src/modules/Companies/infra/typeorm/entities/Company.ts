import { ICompany } from '@modules/Companies/domain/models/ICompany';
import { Project } from '@modules/projects/infra/typeorm/entities/project';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompaniesUsers } from './CompanyUser';

@Entity('companies')
export class Company implements ICompany {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fantasia: string;

    @Column()
    cnpj_cpf: string;

    @Column()
    logo: string;

    @Column()
    codigo: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => CompaniesUsers, companies_user => companies_user.company)
    companies_users: CompaniesUsers[];

    @OneToMany(() => Project, project => project.company)
    projects: Project[];
}
