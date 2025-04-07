import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';
import { differenceInDays } from 'date-fns'; // instale com `npm i date-fns`

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  pessoa: any;
  diasDesaparecido: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private desaparecidosService: DesaparecidosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.desaparecidosService.getDetalhesPessoa(id).subscribe(pessoa => {
      this.pessoa = pessoa;

      const dataDesap = pessoa?.ultimoCorrencia?.dibesaparecimento;
      if (dataDesap) {
        this.diasDesaparecido = differenceInDays(new Date(), new Date(dataDesap));
      }
    });
  }

  abrirModal() {
    // Aqui depois a gente vai implementar o modal com formulário
    console.log("Abrir modal para envio de informações");
  }
}
