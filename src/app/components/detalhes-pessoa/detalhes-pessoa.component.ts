import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesaparecidosService } from 'src/app/core/services/desaparecidos.service';

@Component({
  selector: 'app-detalhes-pessoa',
  templateUrl: './detalhes-pessoa.component.html',
  styleUrls: ['./detalhes-pessoa.component.css']
})

export class DetalhesPessoaComponent {
  private route = inject(ActivatedRoute);
  private desaparecidosService = inject(DesaparecidosService);

  pessoa: any;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.desaparecidosService.getDetalhesPessoa(id).subscribe(p => {
        this.pessoa = p;
      });
    }
  }
}

