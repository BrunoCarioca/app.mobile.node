import { IListUser } from '@modules/users/domain/models/IPaginateUser';
import { IUsersPaginate } from '@modules/users/domain/models/IUsersPaginate';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

export class ListUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({ page, limit }: IListUser): Promise<IUsersPaginate> {
        const skip = (page - 1) * limit;

        const paginateUser = await this.usersRepository.findAll({
            page,
            skip,
            take: limit,
        });

        return paginateUser;
    }
}
