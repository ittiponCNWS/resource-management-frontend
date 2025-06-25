import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';

@Component({
  selector: 'app-admin-setting-page',
  templateUrl: './admin-setting-page.component.html',
  styleUrl: './admin-setting-page.component.scss',
})
export class AdminSettingPageComponent {
  BUTTONNAME = BUTTON_NAME;

  buttonGroup = [
    this.BUTTONNAME.ADD,
    this.BUTTONNAME.EDIT,
    this.BUTTONNAME.DELETE,
    this.BUTTONNAME.EXPORT,
  ];

  onClickButton(eventType: BUTTON_NAME) {
    console.log(eventType);
  }
}
