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
  urlfoto?: string;
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
  mostrarModal: boolean = false;
  statusTexto: string = '';
  statusClasse: string = '';
  dataDesaparecimento: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private desaparecidosService: DesaparecidosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.desaparecidosService.getDetalhesPessoa(id).subscribe((pessoa) => {
      console.log('OBJETO PESSOA COMPLETO:', pessoa);
      this.pessoa = pessoa;
      this.definirStatus();
      this.calcularTempoDesaparecido();
    });
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

    console.log('STATUS DA PESSOA:', this.statusTexto);
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
    console.log('Abrindo modal de envio de informações...');
  }

  
}
