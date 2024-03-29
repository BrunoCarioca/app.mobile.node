import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import {
    IUserRepository,
    SearchParams,
} from '@modules/users/domain/repositories/IUserRepository';
import { dataSource } from '@shared/infra/typeorm';
import { instanceToInstance } from 'class-transformer';
import { In, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IPaginateUser> {
        const [users, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: instanceToInstance(users),
        };

        return result;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.ormRepository.findOneBy({
            email,
        });
        return user;
    }

    public async findById(id: number): Promise<IUser | null> {
        const user = await this.ormRepository.findOneBy({ id });
        return user;
    }

    public async create({
        email,
        name,
        password,
    }: ICreateUser): Promise<IUser> {
        const user = await this.ormRepository.create({
            email,
            name,
            password,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: IUser): Promise<IUser> {
        const updateUser = await this.ormRepository.save(user);
        return updateUser;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async findByAllEmail(emails: string[]): Promise<IUser[] | null> {
        const user = await this.ormRepository.find({
            where: {
                email: In(emails),
            },
        });

        return user;
    }
}
