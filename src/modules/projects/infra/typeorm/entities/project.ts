import { Company } from '@modules/Companies/infra/typeorm/entities/Company';
import { IProject } from '@modules/projects/domain/models/IProject';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProjectsUsers } from './ProjectUser';

@Entity('projects')
export class Project implements IProject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    admin: number;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Company, company => company.projects)
    company_id: string;

    @OneToMany(() => ProjectsUsers, projects_users => projects_users.project)
    projects_users: ProjectsUsers[];
}
