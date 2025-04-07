import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DesaparecidosService, Pessoa } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  todasPessoas: Pessoa[] = [];
  pessoasFiltradas: Pessoa[] = [];
  paginaAtual = 0;
  itensPorPagina = 10;
  loading = true;
  error = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private desaparecidosService: DesaparecidosService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    this.desaparecidosService.getDesaparecidosAleatorios().subscribe({
      next: (res) => {
        this.todasPessoas = res;
        this.pessoasFiltradas = res;
        this.loading = false;
        if (this.paginator) this.paginator.firstPage();
      },
      error: (err) => {
        console.error('Erro ao buscar desaparecidos', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  atualizarResultados(resultados: Pessoa[]): void {
    this.pessoasFiltradas = resultados.length > 0 ? resultados : this.todasPessoas;
    this.paginaAtual = 0;
    if (this.paginator) this.paginator.firstPage();
  }

  onPaginaChange(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
  }

  get dadosVisiveis(): Pessoa[] {
    const inicio = this.paginaAtual * this.itensPorPagina;
    return this.pessoasFiltradas.slice(inicio, inicio + this.itensPorPagina);
  }

  get totalItens(): number {
    return this.pessoasFiltradas.length;
  }
}
