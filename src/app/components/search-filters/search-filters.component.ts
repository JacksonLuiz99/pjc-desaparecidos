import { Component, EventEmitter, Output } from '@angular/core';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})

export class SearchFiltersComponent {
  nome: string = '';
  idadeMin: number | null = null;
  idadeMax: number | null = null;
  sexo: string = '';
  status: string = '';

  @Output() resultadoBusca = new EventEmitter<any[]>();

  constructor(private desaparecidosService: DesaparecidosService) {}

  buscar() {
    this.desaparecidosService.getDesaparecidosPaginados(
      0,
      30, // ou outro valor de página e porPágina se desejar
      this.status || 'DESAPARECIDO',
      this.nome,
      this.sexo,
      this.idadeMin ?? undefined,
      this.idadeMax ?? undefined
    ).subscribe(response => {
      this.resultadoBusca.emit(response.content);
    });
  }

  limpar() {
    this.nome = '';
    this.idadeMin = null;
    this.idadeMax = null;
    this.sexo = '';
    this.status = '';
    this.resultadoBusca.emit([]);
  }
}
