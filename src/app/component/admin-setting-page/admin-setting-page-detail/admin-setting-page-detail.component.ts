import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { GENDER_DROPDOWN } from '../../const/dropdown.const';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-setting-page-detail',
  templateUrl: './admin-setting-page-detail.component.html',
  styleUrls: ['./admin-setting-page-detail.component.scss'],
})
export class AdminSettingPageDetailComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  gendetDropdownOption = GENDER_DROPDOWN;
  formGroup: FormGroup;

  constructor(private _router: Router, private _location: Location) {
    this.formGroup = new FormGroup({
      username: new FormControl('ond009'),
      password: new FormControl('Sung@1234'),
      firstName: new FormControl('Ittipon'),
      lastName: new FormControl('Chinawangso'),
      birthDay: new FormControl(new Date()),
      phoneNumber: new FormControl('0918850500'),
      gender: new FormControl('Male'),
      registerDate: new FormControl(new Date()),
    });
  }
  ngOnInit() {}

  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.SAVE: {
        console.log('SAVE Event');
        break;
      }
      case BUTTON_NAME.CANCEL: {
        this._location.back();
        break;
      }
      default:
        break;
    }
  }
}
