import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDesaparecidosComponent } from './components/lista-desaparecidos/lista-desaparecidos.component';
const routes: Routes = [
  {
    path: 'lista',
    component: ListaDesaparecidosComponent, 
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
