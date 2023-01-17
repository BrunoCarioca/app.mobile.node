import { IProjectsUsers } from '@modules/projects/domain/models/IProjectsUsers';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Project } from './project';

@Entity('projects_users')
export class ProjectsUsers implements IProjectsUsers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.projects_users)
    @JoinColumn({ name: 'id_usuario' })
    user: User;

    @ManyToOne(() => Project, project => project.projects_users)
    @JoinColumn({ name: 'id_project' })
    project: Project;
}
