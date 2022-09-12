import { IRefreshToken } from '@modules/users/domain/models/IRefreshToken';
import { IRefreshRokenRepository } from '@modules/users/domain/repositories/IRefreshTokenRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import RefreshToken from '../entities/RefreshToken';
import { User } from '../entities/User';

export class RefreshTokenRepository implements IRefreshRokenRepository {
    private ormRepository: Repository<RefreshToken>;

    constructor() {
        this.ormRepository = dataSource.getRepository(RefreshToken);
    }

    public async findById(id: string): Promise<IRefreshToken | null> {
        const refreshToken = await this.ormRepository.findOne({
            where: { id },
            relations: { user: true },
        });

        return refreshToken;
    }

    public async create(user: User, expiresIn: number): Promise<IRefreshToken> {
        const refreshToken = await this.ormRepository.create({
            expiresIn,
            user: user,
        });

        await this.ormRepository.save(refreshToken);

        return refreshToken;
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete({
            id,
        });
    }

    public async findByUserId(id: number): Promise<IRefreshToken | null> {
        const refreshToken = await this.ormRepository.findOne({
            where: {
                user: {
                    id,
                },
            },
            relations: { user: true },
        });

        return refreshToken;
    }
}
