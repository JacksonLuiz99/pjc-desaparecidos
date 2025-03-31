import { Component, OnInit } from '@angular/core';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';


@Component({
  selector: 'app-lista-desaparecidos',
  templateUrl: './lista-desaparecidos.component.html',
  styleUrls: ['./lista-desaparecidos.component.css']
})
export class ListaDesaparecidosComponent implements OnInit {
  desaparecidos: any[] = [];
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
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.loading = false;
        this.error = true;
      }
    });
  }

  // NOVO: Variáveis de paginação
paginaAtual = 1;
itensPorPagina = 12; 
// NOVO: Métodos para navegação entre páginas
proximaPagina() {
  this.paginaAtual++;
}

paginaAnterior() {
  if (this.paginaAtual > 1) {
    this.paginaAtual--;
  }
}

  // Método para tentar recarregar em caso de erro
  recarregar() {
    this.carregarDados();
  }
}