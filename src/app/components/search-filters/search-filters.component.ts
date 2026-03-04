import { Component, EventEmitter, Output } from '@angular/core';
import { DesaparecidosFacade } from 'src/app/core/facades/desaparecidos.facade';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
})
export class SearchFiltersComponent {
  nome: string = '';
  idadeMin: number | null = null;
  idadeMax: number | null = null;
  sexo: string = 'undefined';
  status: string = 'undefined';

  @Output() resultadoBusca = new EventEmitter<void>();

  constructor(private facade: DesaparecidosFacade) {}

  buscar(): void {
    const filtros = {
      pagina: 0,
      porPagina: 10,
      nome: this.nome?.trim() || undefined,
      status: this.status !== 'undefined' ? this.status : undefined,
      sexo:
        this.sexo === 'M'
          ? 'MASCULINO'
          : this.sexo === 'F'
            ? 'FEMININO'
            : undefined,
      faixaIdadeInicial: this.idadeMin ?? undefined,
      faixaIdadeFinal: this.idadeMax ?? undefined,
    };

    this.facade.buscar(filtros);
    this.resultadoBusca.emit();
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
