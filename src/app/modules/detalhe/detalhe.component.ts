import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';
import { differenceInDays, parseISO } from 'date-fns';

export interface UltimaOcorrencia {
  localDesaparecimento?: string;
  dtDesaparecimento?: string;
  encontradoVivo?: boolean;
  ocorrenciaEntrevDesapDTO?: {
    vestimentasDesaparecido?: string;
    informacao?: string;
  };
  listCartaz?: { urlCartaz: string; tipCartaz?: string }[];
}

export interface PessoaDetalhe {
  id: number;
  nome: string;
  idade?: number;
  sexo: string;
  vivo?: boolean | null;
  urlFoto?: string;
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
  ultimaOcorrencia?: UltimaOcorrencia | null;
}

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  pessoa!: PessoaDetalhe;
  diasDesaparecido: number | null = null;
  dataDesaparecimento: string | null = null;
  mostrarModal = false;

  statusTexto = '';
  statusClasse = '';
  erroMensagem: string = '';

  constructor(
    private route: ActivatedRoute,
    private desaparecidosService: DesaparecidosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      this.erroMensagem = 'ID inválido ou ausente. Tente novamente.';
      return;
    }

    this.desaparecidosService.getInformacoesCompletasPessoa(id).subscribe(
      (pessoa) => {
        this.pessoa = pessoa;
        this.definirStatus();
        this.calcularTempoDesaparecido();
      },
      (error) => {
        console.error('Erro ao buscar detalhes da pessoa: ', error);
        this.erroMensagem = 'Erro ao carregar os dados da pessoa. Tente novamente mais tarde.';
      }
    );
  }

  definirStatus(): void {
    if (this.pessoa.vivo === true) {
      this.statusTexto = 'Localizado com vida';
      this.statusClasse = 'bg-green-500';
    } else if (this.pessoa.vivo === false) {
      this.statusTexto = 'Localizado sem vida';
      this.statusClasse = 'bg-red-700';
    } else if (this.pessoa.ultimaOcorrencia?.dtDesaparecimento) {
      this.statusTexto = 'Desaparecido';
      this.statusClasse = 'bg-red-500';
    } else {
      this.statusTexto = 'Status indefinido';
      this.statusClasse = 'bg-gray-400';
    }
  }

  calcularTempoDesaparecido(): void {
    const dataDesap = this.pessoa.ultimaOcorrencia?.dtDesaparecimento;
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

  abrirModalInformacao(): void {
    this.mostrarModal = true;
  }
}
