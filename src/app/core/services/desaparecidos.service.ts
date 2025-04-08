import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaDetalhe } from 'src/app/models/pessoa-detalhe.model';

const API_URL = 'https://abitus-api.geia.vip/v1';

export interface Pessoa {
  id: number;
  nome: string;
  idade?: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo?: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: {
    dtDesaparecimento?: string;
    dataLocalizacao?: string;
    encontradoVivo?: boolean;
    localDesaparecimentoConcat?: string;
    ocorrenciaEntrevDesapDTO?: {
      informacao?: string;
      vestimentasDesaparecido?: string;
    };
    listaCartaz?: Array<{
      urlCartaz?: string;
      tipoCartaz?: string;
    }>;
    ocoId?: number;
  };
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

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosService {
  constructor(private http: HttpClient) {}

  //Busca paginada com filtros (novo endpoint correto)
  getDesaparecidosPaginados(
    pagina = 0,
    porPagina = 10,
    status?: string,
    nome?: string,
    sexo?: string,
    faixaIdadeInicial?: number,
    faixaIdadeFinal?: number
  ): Observable<RespostaPaginada> {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('porPagina', porPagina.toString());
  
    if (status) params = params.set('status', status);
    if (nome) params = params.set('nome', nome);
    if (sexo) params = params.set('sexo', sexo);
    if (faixaIdadeInicial != null) params = params.set('faixaIdadeInicial', faixaIdadeInicial.toString());
    if (faixaIdadeFinal != null) params = params.set('faixaIdadeFinal', faixaIdadeFinal.toString());
  
    return this.http.get<RespostaPaginada>(`${API_URL}/pessoas/aberto/filtro`, { params });
  }
  

  //Detalhes simples
  getDetalhesPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${API_URL}/pessoas/${id}`);
  }

  //Detalhes completos
  getInformacoesCompletasPessoa(id: number): Observable<PessoaDetalhe> {
    return this.http.get<PessoaDetalhe>(`${API_URL}/pessoas/${id}`);
  }

  //Exibição aleatória (não recomendado mais)
  getDesaparecidosAleatorios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${API_URL}/pessoas/aberto/dinamico`);
  }

  //Estatísticas
  getEstatisticas(): Observable<EstatisticasDesaparecidos> {
    return this.http.get<EstatisticasDesaparecidos>(`${API_URL}/pessoas/aberto/estatistico`);
  }

  //Informações extras de ocorrência
  getInformacoesDesaparecido(ocoId: number): Observable<InformacaoDesaparecido[]> {
    return this.http.get<InformacaoDesaparecido[]>(`${API_URL}/ocorrencias/informacoes-desaparecido`, {
      params: new HttpParams().set('ocoId', ocoId.toString()),
    });
  }

  //Lista de motivos de ocorrência
  getMotivosOcorrencia(): Observable<MotivoOcorrencia[]> {
    return this.http.get<MotivoOcorrencia[]>(`${API_URL}/ocorrencias/motivos`);
  }

  //Enviar informação sobre desaparecido
  enviarInformacoesDesaparecido(
    ocoId: number,
    informacao: string,
    descricao: string,
    data: string,
    files: File[]
  ): Observable<any> {
    const formData = new FormData();
    formData.append('ocoId', ocoId.toString());
    formData.append('informacao', informacao);
    formData.append('descricao', descricao);
    formData.append('data', data);
    files.forEach(file => formData.append('files', file));
    return this.http.post(`${API_URL}/ocorrencias/informacoes-desaparecido`, formData);
  }

  //Registrar ocorrência digital
  registrarDelegaciaDigital(payload: any): Observable<any> {
    return this.http.post(`${API_URL}/ocorrencias/delegacia-digital`, payload);
  }

  //Verificar duplicidade
  verificarDuplicidade(dados: {
    nome: string;
    mae: string;
    cpf: string;
    dataNascimento: string;
    dataDesaparecimento: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/ocorrencias/delegacia-digital/verificar-duplicidade`, dados);
  }
}
