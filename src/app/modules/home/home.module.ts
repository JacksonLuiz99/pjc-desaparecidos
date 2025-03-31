import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListaDesaparecidosComponent } from './components/lista-desaparecidos/lista-desaparecidos.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    ListaDesaparecidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    NgxPaginationModule,
  ],
  exports: [ListaDesaparecidosComponent] // Adicione esta linha se o componente for usado fora do módulo
})
export class HomeModule { }