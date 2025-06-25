import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTON_NAME } from '../../const/shared.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: true }) buttonName!: BUTTON_NAME;
  @Output() clickButtonEmitter = new EventEmitter<BUTTON_NAME>();
  BUTTON_NAME = BUTTON_NAME;

  onClickButton(buttionType: BUTTON_NAME) {
    this.clickButtonEmitter.emit(buttionType);
  }
}
