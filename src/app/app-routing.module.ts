import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheComponent} from './modules/detalhe/detalhe.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'detalhes/:id', component: DetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxPaginationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }