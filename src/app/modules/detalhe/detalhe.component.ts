import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  pessoa: any;

  constructor(
    private route: ActivatedRoute,
    private desaparecidosService: DesaparecidosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.desaparecidosService.getDetalhesPessoa(id).subscribe(pessoa => {
      this.pessoa = pessoa;
    });
  }
}
