import { Request, Response } from 'express';
import { Hateoas } from './model/HateoasModel';

export class HateoasController {
    public index(request: Request, response: Response): Response {
        const baseUrl = 'http://localhost:3000/api/';
        const hateoas = new Hateoas();

        hateoas.adicionaLink('POST', 'Adicionar um novo usuário', `${baseUrl}usuario`);

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

        hateoas.adicionaLink('POST', 'atualiza o token', `${baseUrl}refresh-token`);

        hateoas.adicionaLink('POST', 'Realiza o login', `${baseUrl}login`);

        return response.status(200).json(hateoas.links);
    }
}
