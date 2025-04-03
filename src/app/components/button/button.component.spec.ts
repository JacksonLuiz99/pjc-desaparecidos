import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickEvent when clicked and not disabled', () => {
    spyOn(component.clickEvent, 'emit');
    component.handleClick(new Event('click'));
    expect(component.clickEvent.emit).toHaveBeenCalled();
  });

  it('should not emit clickEvent when disabled', () => {
    spyOn(component.clickEvent, 'emit');
    component.disabled = true;
    component.handleClick(new Event('click'));
    expect(component.clickEvent.emit).not.toHaveBeenCalled();
  });
});
