import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDesaparecidosComponent } from './components/lista-desaparecidos/lista-desaparecidos.component';
//import { DetalheComponent } from '../detalhe/detalhe.component';
const routes: Routes = [
  {
    path: '',
    component: ListaDesaparecidosComponent, 
  
  }
  //{    path: '',  component: DetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
