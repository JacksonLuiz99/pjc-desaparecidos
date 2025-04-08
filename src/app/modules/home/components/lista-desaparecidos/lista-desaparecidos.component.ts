import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DesaparecidosService, Pessoa, RespostaPaginada } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  pessoasFiltradas: Pessoa[] = [];
  paginaAtual = 0;
  itensPorPagina = 10;
  totalItens = 0;
  loading = true;
  error = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private desaparecidosService: DesaparecidosService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    this.error = false;

    this.desaparecidosService.getDesaparecidosPaginados({
      pagina: this.paginaAtual,
      porPagina: this.itensPorPagina
    })
    .subscribe({
      next: (res: RespostaPaginada) => {
        this.pessoasFiltradas = res.content;
        this.totalItens = res.totalElements;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar desaparecidos', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  atualizarResultados(resultados: Pessoa[]): void {
    this.pessoasFiltradas = resultados;
    this.totalItens = resultados.length;
    this.paginaAtual = 0;
    this.paginator?.firstPage();
  }

  onPaginaChange(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.carregarDados(); // recarrega os dados com nova página
  }

  getStatus(pessoa: Pessoa): { texto: string, classe: string } {
    const localizado = pessoa.ultimaOcorrencia?.encontradoVivo;
    return localizado
      ? { texto: 'Localizado', classe: 'bg-green-100 text-green-700 border-green-300' }
      : { texto: 'Desaparecido', classe: 'bg-red-100 text-red-700 border-red-300' };
  }

  getLocalDesaparecimento(pessoa: Pessoa): string {
    const local = pessoa.ultimaOcorrencia?.localDesaparecimentoConcat;
    return local?.trim() || 'Local não informado';
  }
}
