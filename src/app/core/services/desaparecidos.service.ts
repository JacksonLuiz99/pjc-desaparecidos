import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DuplicidadePayload,
  EstatisticasDesaparecidos,
  InformacaoDesaparecido,
  MotivoOcorrencia,
  Pessoa,
  PessoaDetalhe,
  RespostaPaginada,
} from 'src/app/models/desaparecidos.model';
import { environment } from 'src/environments/environment';

export interface FiltrosPaginados {
  pagina?: number;
  porPagina?: number;
  status?: string;
  nome?: string;
  sexo?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
}

export interface DelegaciaDigitalPayload {
  nome: string;
  cpf?: string;
  dataNascimento?: string;
  dataDesaparecimento: string;
  localDesaparecimento?: string;
  descricao?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDesaparecidosPaginados(
    filtros: FiltrosPaginados,
  ): Observable<RespostaPaginada> {
    let params = new HttpParams()
      .set('pagina', (filtros.pagina ?? 0).toString())
      .set('porPagina', (filtros.porPagina ?? 10).toString());

    if (filtros.status) params = params.set('status', filtros.status);
    if (filtros.nome) params = params.set('nome', filtros.nome);
    if (filtros.sexo) params = params.set('sexo', filtros.sexo);
    if (filtros.faixaIdadeInicial != null)
      params = params.set(
        'faixaIdadeInicial',
        filtros.faixaIdadeInicial.toString(),
      );
    if (filtros.faixaIdadeFinal != null)
      params = params.set(
        'faixaIdadeFinal',
        filtros.faixaIdadeFinal.toString(),
      );

    return this.http.get<RespostaPaginada>(
      `${this.api}/pessoas/aberto/filtro`,
      { params },
    );
  }

  getDetalhesPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.api}/pessoas/${id}`);
  }

  getInformacoesCompletasPessoa(id: number): Observable<PessoaDetalhe> {
    return this.http.get<PessoaDetalhe>(`${this.api}/pessoas/${id}`);
  }

  getDesaparecidosAleatorios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.api}/pessoas/aberto/dinamico`);
  }

  getEstatisticas(): Observable<EstatisticasDesaparecidos> {
    return this.http.get<EstatisticasDesaparecidos>(
      `${this.api}/pessoas/aberto/estatistico`,
    );
  }

  getInformacoesDesaparecido(
    ocoId: number,
  ): Observable<InformacaoDesaparecido[]> {
    return this.http.get<InformacaoDesaparecido[]>(
      `${this.api}/ocorrencias/informacoes-desaparecido`,
      {
        params: new HttpParams().set('ocoId', ocoId.toString()),
      },
    );
  }

  getMotivosOcorrencia(): Observable<MotivoOcorrencia[]> {
    return this.http.get<MotivoOcorrencia[]>(`${this.api}/ocorrencias/motivos`);
  }

  enviarInformacoesDesaparecido(
    ocoId: number,
    informacao: string,
    descricao: string,
    data: string,
    files: File[],
  ): Observable<InformacaoDesaparecido> {
    const formData = new FormData();
    formData.append('ocoId', ocoId.toString());
    formData.append('informacao', informacao);
    formData.append('descricao', descricao);
    formData.append('data', data);
    files.forEach((file) => formData.append('files', file));
    return this.http.post<InformacaoDesaparecido>(
      `${this.api}/ocorrencias/informacoes-desaparecido`,
      formData,
    );
  }

  registrarDelegaciaDigital(
    payload: DelegaciaDigitalPayload,
  ): Observable<unknown> {
    return this.http.post(`${this.api}/ocorrencias/delegacia-digital`, payload);
  }

  verificarDuplicidade(dados: DuplicidadePayload): Observable<unknown> {
    return this.http.post(
      `${this.api}/ocorrencias/delegacia-digital/verificar-duplicidade`,
      dados,
    );
  }
}
