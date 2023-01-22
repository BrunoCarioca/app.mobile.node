import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface IActivity {
    id: number;
    activity: string;
    description: string;
    status: boolean;
    project: Project;
    user: User;
    start: Date;
    end: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IPaginateActivity {
    per_page: number;
    total: number;
    current_page: number;
    data: IActivity[];
}

export interface IActivityCreate {
    activity: string;
    description: string;
    status: boolean;
    project: Project;
    user: User;
}
