export interface Endereco {
    enderecoId: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    latitude: number;
    longitude: number;
}

export interface Hub {
    idHub: string;
    nome: string;
    status: string;
    endereco: Endereco;
}