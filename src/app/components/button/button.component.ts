import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'XButton',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
    @Input() disabled: boolean = false;
    
    @Output() clickEvent = new EventEmitter<Event>();

    handleClick(event: Event): void {
        if (!this.disabled) {
            this.clickEvent.emit(event);
        }
    }
}
