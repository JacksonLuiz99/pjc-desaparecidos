import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListaDesaparecidosComponent } from './components/lista-desaparecidos/lista-desaparecidos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFiltersComponent } from 'src/app/components/search-filters/search-filters.component';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetalheComponent } from '../detalhe/detalhe.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListaDesaparecidosComponent,
    SearchFiltersComponent,
    DetalheComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    NgxPaginationModule,
    FormsModule,

    // Módulos do Material
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [ListaDesaparecidosComponent] // Adicione esta linha se o componente for usado fora do módulo
})
export class HomeModule { }