export interface HateoasInterface {
    metodo: string;
    descricao: string;
    uri: string;
}

export interface HateoasClassInterface {
    adicionaLink(metodo: string, descricao: string, uri: string): void;
}
