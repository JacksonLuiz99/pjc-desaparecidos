import { Component, OnInit } from '@angular/core';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';


@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  desaparecidos: any[] = [];
  dadosFiltrados: any[] = []; // NOVO: Para armazenar os dados vindos do filtro
  loading = true;
  error = false;

  constructor(private desaparecidosService: DesaparecidosService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.loading = true;
    this.error = false;
    console.log('Carregando dados...');
    
    this.desaparecidosService.getDesaparecidosAleatorios().subscribe({
      next: (pessoas) => {
        this.desaparecidos = pessoas;
        this.dadosFiltrados = pessoas; // inicializa os filtrados com os dados
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.loading = false;
        this.error = true;
      }
    });
  }

  // NOVO: Receber dados do filtro
  atualizarResultados(filtrados: any[]) {
    this.dadosFiltrados = filtrados;
  }

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 12; 

  proximaPagina() {
    this.paginaAtual++;
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  recarregar() {
    this.carregarDados();
  }
}
