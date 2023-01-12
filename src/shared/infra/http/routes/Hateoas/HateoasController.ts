import { Request, Response } from 'express';
import { Hateoas } from './model/HateoasModel';

export class HateoasController {
    public index(request: Request, response: Response): Response {
        const baseUrl = 'http://localhost:3000/api/';
        const hateoas = new Hateoas();

        hateoas.adicionaLink('POST', 'Adicionar um novo usuário', `${baseUrl}user`);
        hateoas.adicionaLink(
            'POST',
            'Envia um email com um código aleatorio para o usuário',
            `${baseUrl}forgot-password`,
        );

        hateoas.adicionaLink(
            'GET',
            'Verifica se o código enviado é valido ou não',
            `${baseUrl}forgot-password?code=code`,
        );

        hateoas.adicionaLink('PATCH', 'Atualiza a senha do usuário', `${baseUrl}update-password`);
        hateoas.adicionaLink('POST', 'Atualiza o token', `${baseUrl}refresh-token`);
        hateoas.adicionaLink('POST', 'Realiza o login', `${baseUrl}login`);
        hateoas.adicionaLink(
            'PATCH',
            'Adicionar uma imagem de perfil ao usuário',
            `${baseUrl}user/avatar`,
        );

        hateoas.adicionaLink('GET', 'Lista de usuários', `${baseUrl}user`);
        hateoas.adicionaLink('PUT', 'Atualiza nome e email do usuário', `${baseUrl}user/id`);
        hateoas.adicionaLink('DELETE', 'Deleta o usuário', `${baseUrl}user/id`);
        hateoas.adicionaLink('GET', 'Recupa os dados de um usuário', `${baseUrl}user/id`);

        hateoas.adicionaLink('POST', 'Cadastrar uma empresa', `${baseUrl}company`);

        return response.status(200).json(hateoas.links);
    }
}
