import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { differenceInDays, parseISO } from 'date-fns';
import { tap } from 'rxjs/operators';
import { ModalInformacaoComponent } from 'src/app/components/modal-informacao/modal-informacao.component';
import { DesaparecidosFacade } from 'src/app/core/facades/desaparecidos.facade';
import { PessoaDetalhe } from 'src/app/models/desaparecidos.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  diasDesaparecido: number | null = null;
  dataDesaparecimento: string | null = null;
  statusTexto = '';
  statusClasse = '';

  readonly pessoaDetalhe$ = this.facade.pessoaDetalhe$.pipe(
    tap((pessoa) => {
      if (pessoa) {
        this.definirStatus(pessoa);
        this.calcularTempoDesaparecido(pessoa);
      }
    }),
  );
  readonly erroDetalhe$ = this.facade.erroDetalhe$;

  constructor(
    private route: ActivatedRoute,
    private facade: DesaparecidosFacade,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      this.snackBar.open('ID inválido ou ausente. Tente novamente.', 'Fechar', {
        duration: 5000,
      });
      return;
    }

    this.facade.carregarDetalhe(id);
  }

  private definirStatus(pessoa: PessoaDetalhe): void {
    const ultima = pessoa.ultimaOcorrencia;

    if (ultima?.dataLocalizacao) {
      this.statusTexto = 'Localizado';
      this.statusClasse = 'bg-green-500';
    } else if (ultima?.dtDesaparecimento) {
      this.statusTexto = 'Desaparecido';
      this.statusClasse = 'bg-red-500';
    } else {
      this.statusTexto = 'Status indefinido';
      this.statusClasse = 'bg-gray-400';
    }
  }

  private calcularTempoDesaparecido(pessoa: PessoaDetalhe): void {
    const dataDesap = pessoa.ultimaOcorrencia?.dtDesaparecimento;
    if (dataDesap) {
      const dataDesapDate = parseISO(dataDesap);
      const hoje = new Date();
      this.diasDesaparecido = differenceInDays(hoje, dataDesapDate);
      this.dataDesaparecimento = dataDesapDate.toLocaleDateString('pt-BR');
    } else {
      this.diasDesaparecido = null;
      this.dataDesaparecimento = null;
    }
  }

  abrirModalInformacao(pessoa: PessoaDetalhe): void {
    const ocoId = pessoa.ultimaOcorrencia?.ocoId;
    if (!ocoId) {
      this.snackBar.open('ID da ocorrência não encontrado.', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    this.dialog.open(ModalInformacaoComponent, {
      width: '600px',
      data: { ocoId: ocoId },
    });
  }
}
