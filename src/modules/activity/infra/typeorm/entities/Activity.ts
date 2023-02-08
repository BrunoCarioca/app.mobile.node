import { IActivity } from '@modules/activity/domain/models/IActivity';
import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('activities')
class Activity implements IActivity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    activity: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @OneToOne(() => Project)
    @JoinColumn({ name: 'id_project' })
    project: Project;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Activity;
