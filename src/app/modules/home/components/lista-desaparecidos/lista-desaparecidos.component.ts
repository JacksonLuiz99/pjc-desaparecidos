import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';
// import { PessoaDesaparecida } from 'src/app/core/models/pessoa-desaparecida.model'; // descomente se estiver usando tipagem

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  desaparecidos: any[] = [];      // Lista geral
  dadosFiltrados: any[] = [];     // Lista com filtros aplicados
  loading = true;                 // Estado de carregamento
  error = false;                  // Estado de erro

  totalItens = 0;                 // Total para o paginator
  paginaAtual = 0;                // Página atual
  itensPorPagina = 10;            // Itens por página

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private desaparecidosService: DesaparecidosService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  /**
   * Carrega dados aleatórios da API e inicializa listas.
   */
  carregarDados(): void {
    this.loading = true;
    this.error = false;

    this.desaparecidosService.getDesaparecidosAleatorios().subscribe({
      next: (pessoas) => {
        this.desaparecidos = pessoas;
        this.dadosFiltrados = pessoas;
        this.totalItens = pessoas.length;
        this.loading = false;
        if (this.paginator) this.paginator.firstPage();
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.loading = false;
        this.error = true;
      }
    });
  }

  /**
   * Atualiza dados paginados com base nos filtros aplicados.
   * @param filtrados Lista de pessoas filtradas.
   */
  atualizarResultados(filtrados: any[]): void {
    this.dadosFiltrados = filtrados;
    this.totalItens = filtrados.length;
    this.paginaAtual = 0;
    if (this.paginator) this.paginator.firstPage();
  }

  /**
   * Evento disparado ao mudar a página.
   * @param event Evento do paginator.
   */
  onPaginaChange(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
  }

  /**
   * Recarrega todos os dados da API.
   */
  recarregar(): void {
    this.carregarDados();
  }

  /**
   * Getter opcional que calcula o total de páginas.
   */
  get totalPaginas(): number {
    const total = this.dadosFiltrados.length || this.desaparecidos.length;
    return Math.ceil(total / this.itensPorPagina);
  }
}
