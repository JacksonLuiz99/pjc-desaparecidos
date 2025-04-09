import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'detalhes/:id',
    loadChildren: () =>
      import('./modules/detalhe/detalhe.module').then(m => m.DetalheModule)
  },
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes), NgxPaginationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }