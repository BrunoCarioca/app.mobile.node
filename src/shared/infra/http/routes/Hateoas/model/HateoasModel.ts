import {
    HateoasClassInterface,
    HateoasInterface,
} from './HateoasModelInterface';

class Hateoas implements HateoasClassInterface {
    public links: HateoasInterface[] = [];

    adicionaLink(metodo: string, descricao: string, uri: string): void {
        this.links.push({ metodo, descricao, uri });
    }
}

export { Hateoas };
