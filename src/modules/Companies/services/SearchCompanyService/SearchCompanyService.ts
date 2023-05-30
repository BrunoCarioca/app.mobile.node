import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';

export class SearchCompanyService {
    constructor(private companiesRepository: ICompaniesToUsersRepository) {}

    public async execute(fantasia: string, user_id: number) {
        const response = await this.companiesRepository.findByFantasia(
            fantasia,
            user_id,
        );

        return response;
    }
}
