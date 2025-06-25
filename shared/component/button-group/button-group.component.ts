import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTON_NAME } from '../../const/shared.enum';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {
  @Input({ required: true }) buttonGroup!: BUTTON_NAME[];
  @Output() clickButtonEmitter = new EventEmitter<BUTTON_NAME>();

  BUTTONNAME = BUTTON_NAME;

  constructor() {
    console.log(this.buttonGroup);
  }

  onClickButton(eventType: BUTTON_NAME) {
    this.clickButtonEmitter.emit(eventType);
  }
}
