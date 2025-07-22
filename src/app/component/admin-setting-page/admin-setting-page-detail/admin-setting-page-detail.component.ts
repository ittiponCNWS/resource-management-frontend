import { Component, OnInit } from '@angular/core';
import {
  ACTION_TYPE,
  BUTTON_NAME,
} from '../../../../../shared/const/shared.enum';
import { GENDER_DROPDOWN } from '../../const/dropdown.const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DropdownService } from '../../../../../shared/service/dropdown.service';
import {
  IRoleDropdown,
  IStatusDropdown,
} from '../../../../../shared/interface/dropdown.interface';
import { LoadingService } from '../../../../../shared/service/loading.service';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { AppDialogService } from '../../../../../shared/service/app-dialog.service';
import { AdminSettingService } from '../../../service/admin-setting.service';

@Component({
  selector: 'app-admin-setting-page-detail',
  templateUrl: './admin-setting-page-detail.component.html',
  styleUrls: ['./admin-setting-page-detail.component.scss'],
})
export class AdminSettingPageDetailComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  ACTION_TYPE = ACTION_TYPE;
  gendetDropdownOption = GENDER_DROPDOWN;
  roleDropdownOption: IRoleDropdown[] = [];
  statusDropdownOption: IStatusDropdown[] = [];
  actionType: ACTION_TYPE | null = null;
  formGroup: FormGroup;
  id: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _dropdownService: DropdownService,
    private _appDialogService: AppDialogService,
    private _admingSettingService: AdminSettingService
  ) {
    this._route.queryParams.subscribe((params) => {
      this.actionType = params['actionType'];
      this.id = params['userID'] ?? 0;
    });
    this.formGroup = new FormGroup({
      username: new FormControl('ond009', [Validators.required]),
      password: new FormControl(null),
      firstName: new FormControl('Ittipon', [Validators.required]),
      lastName: new FormControl('Chinawangso', [Validators.required]),
      birthDay: new FormControl(new Date(), [Validators.required]),
      phoneNumber: new FormControl('0918850500', [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      registerDate: new FormControl(new Date()),
      roleID: new FormControl(null, [Validators.required]),
      statusID: new FormControl(null, [Validators.required]),
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
        if (this.formGroup.valid) {
          if (this.actionType === 'Add') {
            this._admingSettingService
              .createUser(this.formGroup.getRawValue())
              .subscribe({
                next: () => {
                  this._router.navigate(['main/admin-setting']);
                },
                error: (err) => {
                  console.log(err.error?.message);
                },
              });
          } else if (this.actionType === 'Edit') {
            this._admingSettingService
              .editUser(this.formGroup.getRawValue(), this.id ?? 0)
              .subscribe({
                next: () => {
                  this._router.navigate(['main/admin-setting']);
                },
                error: (err) => {
                  console.log(err.error?.message);
                },
              });
          }
        } else {
          this.formGroup.markAllAsTouched();
        }
        break;
      }
      case BUTTON_NAME.CANCEL: {
        this._router.navigate(['main/admin-setting']);
        break;
      }
      default:
        break;
    }
  }

  clickResetPassword() {
    this._appDialogService
      .openDialog(
        {
          headerDialog: 'Reset Password',
          data: null,
          dialogType: 'ResetPassword',
        },
        ResetPasswordDialogComponent
      )
      .onClose.subscribe((res) => {
        console.log('reset success');
      });
  }
}
