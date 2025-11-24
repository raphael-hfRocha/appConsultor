export interface Consultor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  area: string;
  experiencia: number;
  tarifa: number;
  disponivel: boolean;
  descricao?: string;
  dataCadastro: Date;
}