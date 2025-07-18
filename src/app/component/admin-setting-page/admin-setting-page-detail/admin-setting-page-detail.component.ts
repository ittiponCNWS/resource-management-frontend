import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { GENDER_DROPDOWN } from '../../const/dropdown.const';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DropdownService } from '../../../../../shared/service/dropdown.service';
import {
  IRoleDropdown,
  IStatusDropdown,
} from '../../../../../shared/interface/dropdown.interface';
import { LoadingService } from '../../../../../shared/service/loading.service';

@Component({
  selector: 'app-admin-setting-page-detail',
  templateUrl: './admin-setting-page-detail.component.html',
  styleUrls: ['./admin-setting-page-detail.component.scss'],
})
export class AdminSettingPageDetailComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  gendetDropdownOption = GENDER_DROPDOWN;
  roleDropdownOption: IRoleDropdown[] = [];
  statusDropdownOption: IStatusDropdown[] = [];
  formGroup: FormGroup;

  constructor(
    private _router: Router,
    private _location: Location,
    private _loadingService: LoadingService,
    private _dropdownService: DropdownService
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl('ond009'),
      password: new FormControl('Sung@1234'),
      firstName: new FormControl('Ittipon'),
      lastName: new FormControl('Chinawangso'),
      birthDay: new FormControl(new Date()),
      phoneNumber: new FormControl('0918850500'),
      gender: new FormControl('Male'),
      registerDate: new FormControl(new Date()),
      roleID: new FormControl(null),
      statusID: new FormControl(null),
    });
  }
  ngOnInit() {
    this._loadingService.show();
    forkJoin({
      roleDropdown: this._dropdownService.getRoleDropdownList(),
      statusDropdown: this._dropdownService.getStatusDropdownList(),
    }).subscribe({
      next: (result) => {
        this.roleDropdownOption = result.roleDropdown;
        this.statusDropdownOption = result.statusDropdown;
      },
      error: (err) => {
        console.error('Fetch data error', err);
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }

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
