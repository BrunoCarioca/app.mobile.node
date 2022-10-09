import RedisCache from '@shared/cache/RedisCache';

export default {
    key: 'ExpireCode',
    options: {
        attempts: 5,
        delay: 60000 * 15,
    },
    async handle({ data }: any) {
        const redis = new RedisCache();
        const codeExist = await redis.hashGet('codigo', data.code);

        if (codeExist) {
            await redis.hashDel('codigo', data.code);
        }
    },
};
