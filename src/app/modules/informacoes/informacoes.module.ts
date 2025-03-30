import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacoesRoutingModule } from './informacoes-routing.module';
import { InformacoesComponent } from './informacoes.component';


@NgModule({
  declarations: [
    InformacoesComponent
  ],
  imports: [
    CommonModule,
    InformacoesRoutingModule
  ]
})
export class InformacoesModule { }
