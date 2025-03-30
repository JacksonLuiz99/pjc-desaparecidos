import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesComponent } from './informacoes.component';

const routes: Routes = [{ path: '', component: InformacoesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacoesRoutingModule { }
