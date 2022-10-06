import { IUser } from '@modules/users/domain/models/IUser';
import { FakeRefreshTokenRepository } from '@modules/users/infra/typeorm/repositories/fake/FakeRefreshTokenRepository';
import { RefreshTokenCreateService } from './RefreshTokenCreateService';

let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let refreshTokenCreateService: RefreshTokenCreateService;

describe('Test Refresh Token Create Service', () => {
    beforeEach(() => {
        fakeRefreshTokenRepository = new FakeRefreshTokenRepository();
        refreshTokenCreateService = new RefreshTokenCreateService(fakeRefreshTokenRepository);
    });

    it('Create refresh token', async () => {
        const user = {
            id: 1,
            email: 'email@teste.com',
            name: 'teste',
            working: false,
            password: '12345',
            created_at: new Date(),
            updated_at: new Date(),
        } as IUser;

        const refresh_token = await refreshTokenCreateService.execute(user);
        expect(refresh_token).toHaveProperty('id');
        expect(refresh_token).toHaveProperty('user');
        expect(refresh_token).toHaveProperty('expiresIn');
        expect(refresh_token.user.id).toEqual(user.id);
    });

    it('Create refresh token', async () => {
        const user = {
            id: 1,
            email: 'email@teste.com',
            name: 'teste',
            working: false,
            password: '12345',
            created_at: new Date(),
            updated_at: new Date(),
        } as IUser;

        await refreshTokenCreateService.execute(user);
        const refresh_token = await refreshTokenCreateService.execute(user);
        expect(refresh_token).toHaveProperty('id');
        expect(refresh_token).toHaveProperty('user');
        expect(refresh_token).toHaveProperty('expiresIn');
        expect(refresh_token.user.id).toEqual(user.id);
    });
});
