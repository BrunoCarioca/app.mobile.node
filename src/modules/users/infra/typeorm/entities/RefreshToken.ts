import { IRefreshToken } from '@modules/users/domain/models/IRefreshToken';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('refresh_token')
class RefreshToken implements IRefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    expiresIn: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    token: string;
}

export default RefreshToken;
