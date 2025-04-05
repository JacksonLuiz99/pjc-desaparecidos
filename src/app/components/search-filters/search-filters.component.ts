import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
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
    // Corrigir sexo para o formato aceito pela API
    const sexoFormatado = this.sexo === 'M' ? 'MASCULINO' : this.sexo === 'F' ? 'FEMININO' : '';

    const statusList = this.status ? [this.status] : ['DESAPARECIDO', 'LOCALIZADO'];

    const chamadas = statusList.map(status =>
      this.desaparecidosService.getDesaparecidosPaginados(
        0,
        999,
        status,
        this.nome || '',
        sexoFormatado || '',
        this.idadeMin ?? 0,
        this.idadeMax ?? 0
      )
    );

    forkJoin(chamadas).subscribe(resultados => {
      const unificado = resultados.flatMap(r => r.content);
      this.resultadoBusca.emit(unificado);
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
