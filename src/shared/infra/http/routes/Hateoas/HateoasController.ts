import { Request, Response } from 'express';
import { Hateoas } from './model/HateoasModel';
import { HateoasInterface } from './model/HateoasModelInterface';

interface ResponseHateoas {
    key: string;
    links: HateoasInterface[];
}

export class HateoasController {
    public index(request: Request, response: Response): Response {
        const baseUrl = 'http://localhost:3000/api/';
        const hateoas: ResponseHateoas[] = [];
        const hateoasLinks = new Hateoas();

        //links Users
        hateoasLinks.adicionaLink('GET', 'Recupa os dados de um usuário', `${baseUrl}user/id`);
        hateoasLinks.adicionaLink('GET', 'Lista de usuários', `${baseUrl}user`);
        hateoasLinks.adicionaLink(
            'GET',
            'Verifica se o código enviado é valido ou não',
            `${baseUrl}forgot-password?code=code`,
        );
        hateoasLinks.adicionaLink('POST', 'Adicionar um novo usuário', `${baseUrl}user`);
        hateoasLinks.adicionaLink(
            'POST',
            'Envia um email com um código aleatorio para o usuário',
            `${baseUrl}forgot-password`,
        );
        hateoasLinks.adicionaLink('PUT', 'Atualiza nome e email do usuário', `${baseUrl}user/id`);
        hateoasLinks.adicionaLink(
            'PATCH',
            'Adicionar uma imagem de perfil ao usuário',
            `${baseUrl}user/avatar`,
        );
        hateoasLinks.adicionaLink(
            'PATCH',
            'Atualiza a senha do usuário',
            `${baseUrl}update-password`,
        );
        hateoasLinks.adicionaLink('DELETE', 'Deleta Usuário', `${baseUrl}user/id`);

        hateoas.push({
            key: 'Users',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        //links Session
        hateoasLinks.links = [];
        hateoasLinks.adicionaLink('POST', 'Realiza o login', `${baseUrl}login`);

        hateoas.push({
            key: 'Session',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        //links Company
        hateoasLinks.links = [];
        hateoasLinks.adicionaLink(
            'GET',
            'listar os usuários da empresa, apenas para membros da empresa',
            `${baseUrl}company-users/companyId`,
        );
        hateoasLinks.adicionaLink(
            'GET',
            'lista as empresas do usuário',
            `${baseUrl}user-companies`,
        );
        hateoasLinks.adicionaLink('POST', 'Cadastrar uma empresa', `${baseUrl}company`);
        hateoasLinks.adicionaLink(
            'POST',
            'Adicionar um novo usuario na empresa',
            `${baseUrl}company-users`,
        );

        hateoas.push({
            key: 'Company',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        /**Links Projects */
        hateoasLinks.links = [];

        hateoasLinks.adicionaLink('GET', 'Listar projetos do usuario', `${baseUrl}projects`);
        hateoasLinks.adicionaLink('GET', 'Show projeto', `${baseUrl}projects/id`);
        hateoasLinks.adicionaLink('POST', 'Cadastrar um novo projeto', `${baseUrl}projects`);
        hateoasLinks.adicionaLink('PUT', 'Atualizar projeto', `${baseUrl}projects`);
        hateoasLinks.adicionaLink('DELETE', 'Deleta projeto', `${baseUrl}projects`);

        hateoas.push({
            key: 'Projects',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        /**Links Users Projects */
        hateoasLinks.links = [];

        hateoasLinks.adicionaLink(
            'GET',
            'Listar usuarios no projeto',
            `${baseUrl}user-projects/id`,
        );
        hateoasLinks.adicionaLink(
            'POST',
            'Adiciona usuarios no projeto',
            `${baseUrl}user-projects/id`,
        );
        hateoasLinks.adicionaLink(
            'Delete',
            'Remover usuarios no projeto',
            `${baseUrl}user-projects/id`,
        );

        hateoas.push({
            key: 'Projects',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        /**Links activities */
        hateoasLinks.links = [];

        hateoasLinks.adicionaLink('GET', 'Lista atividades do usuário', `${baseUrl}activities`);
        hateoasLinks.adicionaLink('GET', 'Mostrar atividade do usuário', `${baseUrl}activities/id`);
        hateoasLinks.adicionaLink('POST', 'Criar uma atividade', `${baseUrl}activities`);
        hateoasLinks.adicionaLink('Delete', 'Deletar ativdade', `${baseUrl}activities/id`);

        hateoas.push({
            key: 'activities',
            links: hateoasLinks.links,
        });
        /******************************************************* */
        /**Links Users reports */
        hateoasLinks.links = [];
        hateoasLinks.adicionaLink('POST', 'Criar uma Relatoria da atividade', `${baseUrl}reports`);

        hateoas.push({
            key: 'reports',
            links: hateoasLinks.links,
        });
        /******************************************************* */

        return response.status(200).json(hateoas);
        //hateoasLinks.adicionaLink('POST', 'Atualiza o token', `${baseUrl}refresh-token`);
    }
}
