interface IMailConfig {
    driver: 'nodemailer' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'nodemailer',
    defaults: {
        from: {
            email: 'api.tcc@brunodev.software',
            name: 'Bruno Maia',
        },
    },
} as IMailConfig;
