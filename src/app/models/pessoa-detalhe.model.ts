export interface UltimaOcorrencia {
    localDesaparecimento?: string;
    dtDesaparecimento?: string;
    encontradoVivo?: boolean;
    ocorrenciaEntrevDesapDTO?: {
      vestimentasDesaparecido?: string;
      informacao?: string;
    };
    listCartaz?: { urlCartaz: string; tipCartaz?: string }[];
  }
  
  export interface PessoaDetalhe {
    id: number;
    nome: string;
    idade?: number;
    sexo: string;
    vivo?: boolean | null;
    urlfoto?: string;
    status?: 'DESAPARECIDO' | 'LOCALIZADO';
    ultimaOcorrencia?: UltimaOcorrencia | null;
  }
  