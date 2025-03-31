import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesaparecidosComponent } from './lista-desaparecidos.component';

describe('ListaDesaparecidosComponent', () => {
  let component: ListaDesaparecidosComponent;
  let fixture: ComponentFixture<ListaDesaparecidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDesaparecidosComponent]
    });
    fixture = TestBed.createComponent(ListaDesaparecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
