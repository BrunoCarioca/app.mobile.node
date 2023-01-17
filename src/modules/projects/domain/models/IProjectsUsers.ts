import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface IProjectsUsers {
    id: number;
    user: User;
    project: Project;
    created_at: Date;
    updated_at: Date;
}
