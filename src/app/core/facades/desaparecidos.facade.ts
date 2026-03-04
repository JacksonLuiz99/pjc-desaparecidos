import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pessoa, PessoaDetalhe } from 'src/app/models/desaparecidos.model';
import {
  DesaparecidosService,
  FiltrosPaginados,
} from '../services/desaparecidos.service';

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosFacade {
  private readonly _pessoas$ = new BehaviorSubject<Pessoa[]>([]);
  private readonly _total$ = new BehaviorSubject<number>(0);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  private readonly _erro$ = new BehaviorSubject<boolean>(false);
  private readonly _pessoaDetalhe$ = new BehaviorSubject<PessoaDetalhe | null>(
    null,
  );
  private readonly _erroDetalhe$ = new BehaviorSubject<string>('');

  readonly pessoas$ = this._pessoas$.asObservable();
  readonly total$ = this._total$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly erro$ = this._erro$.asObservable();
  readonly pessoaDetalhe$ = this._pessoaDetalhe$.asObservable();
  readonly erroDetalhe$ = this._erroDetalhe$.asObservable();

  constructor(private service: DesaparecidosService) {}

  buscar(filtros: FiltrosPaginados): void {
    this._loading$.next(true);
    this._erro$.next(false);

    this.service.getDesaparecidosPaginados(filtros).subscribe({
      next: (res) => {
        this._pessoas$.next(res.content);
        this._total$.next(res.totalElements);
        this._loading$.next(false);
      },
      error: () => {
        this._erro$.next(true);
        this._loading$.next(false);
      },
    });
  }

  carregarDetalhe(id: number): void {
    this._erroDetalhe$.next('');
    this._pessoaDetalhe$.next(null);

    this.service.getInformacoesCompletasPessoa(id).subscribe({
      next: (pessoa) => this._pessoaDetalhe$.next(pessoa),
      error: () =>
        this._erroDetalhe$.next(
          'Erro ao carregar os dados da pessoa. Tente novamente mais tarde.',
        ),
    });
  }
}
