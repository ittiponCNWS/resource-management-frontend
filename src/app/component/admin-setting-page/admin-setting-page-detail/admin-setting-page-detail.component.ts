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
import { IUser } from '../../../../interface/user-setting.interface';

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
  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];
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
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      birthDay: new FormControl(new Date(), [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      registerDate: new FormControl({ value: new Date(), disabled: true }),
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

        // Step 2: Check action
        if (this.actionType !== 'Add') {
          this.fetchUserById();
        } else {
          this._loadingService.hide(); // No need to fetch by id
        }
      },
      error: (err) => {
        console.error('Fetch data error', err);
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }

  fetchUserById() {
    this._admingSettingService.getUserByID(this.id).subscribe({
      next: (user: IUser) => {
        this.formGroup.patchValue(this.convertUserDates(user));
      },
      error: (err) => {
        console.error('Fetch user by ID error', err);
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }

  convertUserDates(user: IUser): any {
    return {
      ...user,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
      registerDate: user.registerDate ? new Date(user.registerDate) : null,
    };
  }

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
