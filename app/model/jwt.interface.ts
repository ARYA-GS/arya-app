export interface JwtInterface {
  sub: string;
  id: string | number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  exp: number;
}
