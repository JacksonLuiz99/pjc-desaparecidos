import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DesaparecidosFacade } from 'src/app/core/facades/desaparecidos.facade';
import { Pessoa } from 'src/app/models/desaparecidos.model';

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css'],
})
export class ListaDesaparecidosComponent implements OnInit {
  paginaAtual = 0;
  itensPorPagina = 10;

  readonly pessoas$ = this.facade.pessoas$;
  readonly total$ = this.facade.total$;
  readonly loading$ = this.facade.loading$;
  readonly erro$ = this.facade.erro$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private facade: DesaparecidosFacade) {}

  ngOnInit(): void {
    this.facade.buscar({
      pagina: this.paginaAtual,
      porPagina: this.itensPorPagina,
    });
  }

  atualizarResultados(): void {
    this.paginaAtual = 0;
    this.paginator?.firstPage();
    // resultados já foram emitidos pela Facade via search-filters
  }

  onPaginaChange(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.facade.buscar({
      pagina: this.paginaAtual,
      porPagina: this.itensPorPagina,
    });
  }

  getStatus(pessoa: Pessoa): { texto: string; classe: string } {
    return pessoa.ultimaOcorrencia?.encontradoVivo
      ? {
          texto: 'Localizado',
          classe: 'bg-green-100 text-green-700 border-green-300',
        }
      : {
          texto: 'Desaparecido',
          classe: 'bg-red-100 text-red-700 border-red-300',
        };
  }

  getLocalDesaparecimento(pessoa: Pessoa): string {
    return (
      pessoa.ultimaOcorrencia?.localDesaparecimentoConcat?.trim() ||
      'Local não informado'
    );
  }
}
