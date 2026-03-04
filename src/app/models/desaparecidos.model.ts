export interface UltimaOcorrencia {
  localDesaparecimentoConcat?: string;
  dtDesaparecimento?: string;
  dataLocalizacao?: string;
  encontradoVivo?: boolean;
  ocoId?: number;
  ocorrenciaEntrevDesapDTO?: {
    vestimentasDesaparecido?: string;
    informacao?: string;
  };
  listCartaz?: { urlCartaz: string; tipCartaz?: string }[];
}

export interface Pessoa {
  id: number;
  nome: string;
  idade?: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo?: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: UltimaOcorrencia;
}

export interface PessoaDetalhe {
  id: number;
  nome: string;
  idade?: number;
  sexo: string;
  vivo?: boolean | null;
  urlFoto?: string;
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
  ultimaOcorrencia?: UltimaOcorrencia | null;
}

export interface RespostaPaginada {
  content: Pessoa[];
  totalElements: number;
  number: number;
}

export interface EstatisticasDesaparecidos {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export interface InformacaoDesaparecido {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos: string[];
}

export interface MotivoOcorrencia {
  id: number;
  descricao: string;
}

export interface EnviarInformacaoPayload {
  ocoId: number;
  informacao: string;
  descricao: string;
  data: string;
}

export interface DuplicidadePayload {
  nome: string;
  mae: string;
  cpf: string;
  dataNascimento: string;
  dataDesaparecimento: string;
}
