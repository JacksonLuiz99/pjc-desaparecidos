export interface Pessoa {
  id: number;
  nome?: string;
  home?: string; 
  idade?: number;
  sexo?: 'MASCULINO' | 'FEMININO';
  ultimoCorrencia?: {
    dibesaparecimento: string;
    encontradoVivo: boolean;
    listCartaz: Array<{
      urlCartaz: string;
    }>;
  };
}