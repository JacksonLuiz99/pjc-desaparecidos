import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';
// import { PessoaDesaparecida } from 'src/app/core/models/pessoa-desaparecida.model'; // descomente se usar tipo

@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  desaparecidos: any[] = [];
  dadosFiltrados: any[] = [];
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

  carregarDados() {
    this.loading = true;
    this.error = false;

    this.desaparecidosService.getDesaparecidosAleatorios().subscribe({
      next: (pessoas) => {
        this.desaparecidos = pessoas;
        this.dadosFiltrados = pessoas;
        this.totalItens = pessoas.length;
        this.loading = false;
        if (this.paginator) this.paginator.firstPage(); // opcional
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.loading = false;
        this.error = true;
      }
    });
  }

  onPaginaChange(event: PageEvent) {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
  }

  atualizarResultados(filtrados: any[]) {
    this.dadosFiltrados = filtrados;
    this.totalItens = filtrados.length;
    this.paginaAtual = 0;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  recarregar() {
    this.carregarDados();
  }

  get totalPaginas(): number {
    const total = this.dadosFiltrados.length || this.desaparecidos.length;
    return Math.ceil(total / this.itensPorPagina);
  }
}
