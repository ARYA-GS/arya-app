export interface OcorrenciaInterface {
  idOcorrencia?: string;
  tipoOcorrencia: string;
  nivelSeveridade: number;
  dataOcorrencia: string;
  descricao: string;
  idUsuario: string;
  endereco: {
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
  };
}