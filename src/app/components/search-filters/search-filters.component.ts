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
    const sexoValido =
      this.sexo === 'M' ? 'MASCULINO' :
      this.sexo === 'F' ? 'FEMININO' :
      undefined;

    const statusValido = this.status !== 'undefined' ? this.status : undefined;

    this.desaparecidosService.getDesaparecidosPaginados(
      0,
      999,
      statusValido,
      this.nome?.trim() || undefined,
      sexoValido,
      this.idadeMin ?? undefined,
      this.idadeMax ?? undefined
    ).subscribe(resultado => {
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
