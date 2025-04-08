import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformacaoComponent } from './modal-informacao.component';

describe('ModalInformacaoComponent', () => {
  let component: ModalInformacaoComponent;
  let fixture: ComponentFixture<ModalInformacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInformacaoComponent]
    });
    fixture = TestBed.createComponent(ModalInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
