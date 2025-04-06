import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://abitus-api.geia.vip/v1';

export interface Pessoa {
  id: number;
  nome: string;
  idade?: number;
  sexo: string;
  vivo?: boolean;
  urlFoto?: string;
  corOlhos?: string;
  corCabelos?: string;
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
  // Campos normalizados
  ultimoCorrencia?: {
    dibesaparecimento?: string;
    datalocalizacao?: string;
    encontradoVivo?: boolean;
    listCartaz?: Array<{
      urlCartaz?: string;
      tipCartaz?: string;
    }>;
  };
}

interface RespostaPaginada {
  content: Pessoa[];
  totalElements: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class DesaparecidosService {
  constructor(private http: HttpClient) {}

  // Lista paginada com filtros
  getDesaparecidosPaginados(
    pagina: number = 0,
    porPagina: number = 10,
    status: string = 'DESAPARECIDO',
    nome?: string,
    sexo?: string,
    faixaIdadeInicial?: number,
    faixaIdadeFinal?: number
  ): Observable<RespostaPaginada> {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('porPagina', porPagina.toString())
      .set('status', status);

    if (nome) params = params.set('nome', nome);
    if (sexo) params = params.set('sexo', sexo);
    if (faixaIdadeInicial != null) {
      params = params.set('faixaIdadeInicial', faixaIdadeInicial.toString());
    }
    if (faixaIdadeFinal != null) {
      params = params.set('faixaIdadeFinal', faixaIdadeFinal.toString());
    }

    return this.http.get<RespostaPaginada>(`${API_URL}/pessoas/aberto/filtro`, { params }).pipe(
      map(response => this.normalizarDados(response))
    );
  }

  // Detalhes de uma pessoa
  getDetalhesPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${API_URL}/pessoas/${id}`).pipe(
      map(pessoa => this.normalizarPessoa(pessoa))
    );
  }

  // Dados aleatórios para home
  getDesaparecidosAleatorios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${API_URL}/pessoas/aberto/dinamico`).pipe(
      map(lista => lista.map(pessoa => this.normalizarPessoa(pessoa)))
    );
  }

  // Normaliza os campos da API para nomes consistentes
  private normalizarPessoa(pessoa: Pessoa): Pessoa {
    const ultima = pessoa.ultimaOcorrencia;

    return {
      ...pessoa,
      nome: pessoa.nome || 'Nome não informado',
      sexo: pessoa.sexo || 'Não informado',
      corOlhos: pessoa.corOlhos || undefined,
      corCabelos: pessoa.corCabelos || undefined,
      urlFoto: pessoa.urlFoto ||
               ultima?.listaCartaz?.[0]?.urlCartaz ||
               'assets/imagem-padrao.svg',
        ultimaOcorrencia: {
        dtDesaparecimento: ultima?.dtDesaparecimento,
        dataLocalizacao: ultima?.dataLocalizacao,
        encontradoVivo: ultima?.encontradoVivo,
        listaCartaz: ultima?.listaCartaz?.map(c => ({
          urlCartaz: c.urlCartaz,
          tipCartaz: c.tipoCartaz
        }))
      }
    };
  }

  private normalizarDados(response: RespostaPaginada): RespostaPaginada {
    return {
      ...response,
      content: response.content.map(p => this.normalizarPessoa(p))
    };
  }
}
