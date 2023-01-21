import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IUser } from '@modules/users/domain/models/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IProject } from './IProject';

export interface IProjectsUsers {
    id: number;
    user: User;
    project: Project;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateProjectsUsers {
    user: IUser;
    project: IProject;
}
