import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://abitus-api.geia.vip/v1';

interface Pessoa {
  id: number;
  nome?: string;
  home?: string; // Campo alternativo para nome
  idade?: number;
  sexo?: string;
  escor?: string; // Campo alternativo para sexo
  exo?: string;   // Outro campo alternativo para sexo
  vivo?: boolean;
  urlFoto?: string;
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
    if (faixaIdadeInicial) params = params.set('faixaIdealInicial', faixaIdadeInicial.toString());
    if (faixaIdadeFinal) params = params.set('faixaIdealFinal', faixaIdadeFinal.toString());

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

  // Dados randômicos (para a página inicial)
  getDesaparecidosAleatorios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${API_URL}/pessoas/{aberto/dinamico?registros=12}`)
  }

  // Normaliza os campos da API para nomes consistentes
  private normalizarPessoa(pessoa: Pessoa): Pessoa {
    return {
      ...pessoa,
      nome: pessoa.nome || pessoa.home || 'Nome não informado',
      sexo: pessoa.sexo || pessoa.escor || pessoa.exo || 'Não informado',
      urlFoto: pessoa.urlFoto || 
               pessoa.ultimoCorrencia?.listCartaz?.[0]?.urlCartaz || 
               'assets/imagem-padrao.svg'
    };
  }

  private normalizarDados(response: RespostaPaginada): RespostaPaginada {
    return {
      ...response,
      content: response.content.map(p => this.normalizarPessoa(p))
    };
  }
}