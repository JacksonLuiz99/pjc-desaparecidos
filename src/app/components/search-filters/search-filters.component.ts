import { Component, EventEmitter, Output  } from '@angular/core';

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

  @Output() filtrosAlterados = new EventEmitter<any>();

  buscar() {
    this.filtrosAlterados.emit({
      nome: this.nome,
      idadeMin: this.idadeMin,
      idadeMax: this.idadeMax,
      sexo: this.sexo,
      status: this.status
    });
  }

  limpar() {
    this.nome = '';
    this.idadeMin = null;
    this.idadeMax = null;
    this.sexo = '';
    this.status = '';
    this.buscar(); 
  }
}
