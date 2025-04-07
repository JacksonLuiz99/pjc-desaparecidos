import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheComponent } from './detalhe.component';
import { DetalheRoutingModule } from './detalhe-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DetalheComponent
  ],
  imports: [
    CommonModule,
    DetalheRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,

  ]
})
export class DetalheModule { }
