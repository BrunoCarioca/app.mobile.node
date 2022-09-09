import { Request, Response } from 'express';
import { Hateoas } from './model/HateoasModel';

export class HateoasController {
    public index(request: Request, response: Response): Response {
        const baseUrl = 'http://localhost:3000/api/';
        const hateoas = new Hateoas();

        hateoas.adicionaLink(
            'POST',
            'Adicionar um novo usuário',
            `${baseUrl}usuario`,
        );
        return response.status(200).json(hateoas.links);
    }
}
