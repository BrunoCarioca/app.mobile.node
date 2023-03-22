import redisCache from '@shared/cache/RedisCache';

export default {
    key: 'ExpireCode',
    options: {
        attempts: 5,
        delay: 60000 * 15,
    },
    async handle({ data }: any) {
        const codeExist = await redisCache.hashGet('codigo', data.code);

        if (codeExist) {
            await redisCache.hashDel('codigo', data.code);
        }
    },
};
