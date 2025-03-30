import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, { path: 'detalhe', loadChildren: () => import('./modules/detalhe/detalhe.module').then(m => m.DetalheModule) }, { path: 'informacoes', loadChildren: () => import('./modules/informacoes/informacoes.module').then(m => m.InformacoesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
