import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';
import { Pessoa } from 'src/app/core/services/desaparecidos.service'; // usando a tipagem correta

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  desaparecidos: Pessoa[] = [];
  dadosFiltrados: Pessoa[] = [];
  loading = true;
  error = false;

  totalItens = 0;
  paginaAtual = 0;
  itensPorPagina = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private desaparecidosService: DesaparecidosService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

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

  atualizarResultados(filtrados: Pessoa[]): void {
    this.dadosFiltrados = filtrados;
    this.totalItens = filtrados.length;
    this.paginaAtual = 0;
    if (this.paginator) this.paginator.firstPage();
  }

  onPaginaChange(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
  }

  recarregar(): void {
    this.carregarDados();
  }

  get totalPaginas(): number {
    const total = this.dadosFiltrados.length || this.desaparecidos.length;
    return Math.ceil(total / this.itensPorPagina);
  }

  get dadosPaginados(): Pessoa[] {
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.dadosFiltrados.slice(inicio, fim);
  }
}
