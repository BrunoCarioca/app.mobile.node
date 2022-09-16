import 'dotenv/config';
import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class Mail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.APP_MAIL_USER,
                pass: process.env.APP_MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe api tcc',
                address: from?.email || 'equipe@apimobile.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });
    }
}
