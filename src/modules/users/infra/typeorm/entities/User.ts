import { CompaniesUsers } from '@modules/Companies/infra/typeorm/entities/CompanyUser';
import { ProjectsUsers } from '@modules/projects/infra/typeorm/entities/ProjectUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    working: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    avatar: string;

    @OneToMany(() => CompaniesUsers, companies_user => companies_user.user)
    companies_users: CompaniesUsers[];

    @OneToMany(() => ProjectsUsers, projects_users => projects_users.user)
    projects_users: ProjectsUsers[];

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        return `${process.env.APP_URL}/files/${this.avatar}`;
    }
}
