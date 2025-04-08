import { Component, EventEmitter, Output } from '@angular/core';
import { DesaparecidosService, Pessoa } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent {
  nome: string = '';
  idadeMin: number | null = null;
  idadeMax: number | null = null;
  sexo: string = 'undefined';
  status: string = 'undefined';

  @Output() resultadoBusca = new EventEmitter<Pessoa[]>();

  constructor(private desaparecidosService: DesaparecidosService) {}

  buscar(): void {
    const filtros = {
      pagina: 0,
      porPagina: 10,
      nome: this.nome?.trim() || undefined,
      status: this.status !== 'undefined' ? this.status : undefined,
      sexo: this.sexo === 'M' ? 'MASCULINO' : this.sexo === 'F' ? 'FEMININO' : undefined,
      faixaIdadeInicial: this.idadeMin ?? undefined,
      faixaIdadeFinal: this.idadeMax ?? undefined,
    };

    this.desaparecidosService.getDesaparecidosPaginados(filtros).subscribe(resultado => {
      this.resultadoBusca.emit(resultado.content);
    });
  }

  limpar(): void {
    this.nome = '';
    this.idadeMin = null;
    this.idadeMax = null;
    this.sexo = 'undefined';
    this.status = 'undefined';
    this.buscar();
  }
}
