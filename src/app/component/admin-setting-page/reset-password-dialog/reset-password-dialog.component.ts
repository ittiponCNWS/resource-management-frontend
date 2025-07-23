import { Component, Input, OnInit } from '@angular/core';
import {
  ACTION_TYPE,
  BUTTON_NAME,
} from '../../../../../shared/const/shared.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDialogService } from '../../../../../shared/service/app-dialog.service';
import { AdminSettingService } from '../../../service/admin-setting.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
})
export class ResetPasswordDialogComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  ACTION_TYPE = ACTION_TYPE;
  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];
  formGroup: FormGroup;
  id = 0;

  constructor(
    private _appDialogService: AppDialogService,
    private _admingSettingService: AdminSettingService,
    public _config: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
    });
    //get id from config
    this.id = this._config.data.data.userID;
  }

  ngOnInit() {}

  onClickButton(event: BUTTON_NAME) {
    switch (event) {
      case BUTTON_NAME.SAVE:
        if (this.formGroup.valid) {
          this._admingSettingService
            .resetPassword(
              this.id,
              this.formGroup.controls['newPassword'].value
            )
            .subscribe({
              next: () => {
                this._appDialogService.closeDialog(true);
              },
              error: (err: HttpErrorResponse) => {
                if (err.error.errorCode === 'PASSWORD_DUPLICATE') {
                  console.log('duplicate password');
                }
              },
            });
        } else {
          this.formGroup.markAllAsTouched();
        }
        break;
      case BUTTON_NAME.CANCEL:
        this._appDialogService.closeDialog();
        break;
      default:
        break;
    }
  }
}
