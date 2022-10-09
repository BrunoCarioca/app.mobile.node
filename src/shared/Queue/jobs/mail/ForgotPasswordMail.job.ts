import Mail from '@config/mail/Mail';
import path from 'path';

export default {
    key: 'ForgotPasswordMail',
    options: {
        attempts: 5,
        delay: 1000,
    },
    async handle({ data }: any) {
        const forgotPasswordTemplate = path.resolve(__dirname, 'views', 'forgot_password.hbs');

        await Mail.sendMail({
            to: {
                name: 'testeNome',
                email: data.email,
            },
            subject: '[API TCC] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: data.name,
                    codigo: data.codigo,
                },
            },
        });
    },
};
