import { IReport } from '@modules/activity/domain/models/IReport';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Activity from './Activity';

@Entity('reports')
class Report implements IReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    report: string;

    @OneToOne(() => Activity)
    @JoinColumn({ name: 'activityId' })
    activity: Activity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Report;
