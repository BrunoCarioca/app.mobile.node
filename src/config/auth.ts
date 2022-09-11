export default {
    jwt: {
        secret: String(process.env.APP_JWT_ACCESS_SECRET),
        expiresIn: '1d',
    },
};
