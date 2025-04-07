import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
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

    const statusList = this.status && this.status !== 'undefined'
      ? [this.status]
      : ['DESAPARECIDO', 'LOCALIZADO'];

    const chamadas = statusList.map(status =>
      this.desaparecidosService.getDesaparecidosPaginados(
        0,
        999,
        status,
        this.nome?.trim() || undefined,
        sexoValido,
        this.idadeMin ?? undefined,
        this.idadeMax ?? undefined
      )
    );

    forkJoin(chamadas).subscribe(resultados => {
      const unificado = resultados.flatMap(r => r.content);
      this.resultadoBusca.emit(unificado);
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
