import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTON_NAME } from '../../const/shared.enum';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {
  @Input({ required: true }) buttonGroup!: BUTTON_NAME[];
  @Input({ required: true }) selectedItem: any[] | null = null;
  @Input() buttonJustifyContent: 'start' | 'center' | 'end' = 'start';
  @Output() clickButtonEmitter = new EventEmitter<BUTTON_NAME>();

  BUTTONNAME = BUTTON_NAME;

  constructor() {}

  onClickButton(eventType: BUTTON_NAME) {
    this.clickButtonEmitter.emit(eventType);
  }

  checkDisabledButton(buttonName: BUTTON_NAME): boolean {
    switch (buttonName) {
      case BUTTON_NAME.ADD:
        return false;
      case BUTTON_NAME.EDIT:
        return this.selectedItem?.length !== 1;
      case BUTTON_NAME.DELETE:
        return (
          this.selectedItem?.length === undefined ||
          this.selectedItem?.length <= 0
        );
      case BUTTON_NAME.EXPORT:
        return false;
      default:
        return false;
    }
  }
}
