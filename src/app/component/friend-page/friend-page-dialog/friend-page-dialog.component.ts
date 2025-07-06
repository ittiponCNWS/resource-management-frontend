import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { AppDialogService } from '../../../../../shared/service/app-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GENDER_DROPDOWN } from '../../const/dropdown.const';
import { FriendService } from '../../../service/friend.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IDialogConfig } from '../../../../../shared/interface/shared.interface';

@Component({
  selector: 'app-friend-page-dialog',
  templateUrl: './friend-page-dialog.component.html',
  styleUrls: ['./friend-page-dialog.component.scss'],
})
export class FriendPageDialogComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  formGroup: FormGroup;
  gendetDropdownOption = GENDER_DROPDOWN;
  configDataRow!: IDialogConfig;
  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];
  dialogType: 'Add' | 'Edit' = 'Add';
  id: number | null = null;

  constructor(
    private _AppDialogService: AppDialogService,
    private _friendService: FriendService,
    public _config: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      isFavorite: new FormControl(false),
      birthDay: new FormControl(new Date(), [Validators.required]),
      phoneNumber: new FormControl(null),
      gender: new FormControl(null, [Validators.required]),
      remark: new FormControl(null),
    });
    this.configDataRow = this._config.data;
  }
  ngOnInit() {
    this.dialogType = this.configDataRow.dialogType;
    if (this.configDataRow.dialogType === 'Edit') {
      this.patchFriendValue();
    }
  }

  private patchFriendValue() {
    const friend = this.configDataRow.data;
    this.id = friend.id;
    this.formGroup.patchValue({
      firstName: friend.firstName,
      lastName: friend.lastName,
      isFavorite: friend.isFavorite,
      birthDay: new Date(friend.birthDay),
      phoneNumber: friend.phoneNumber,
      gender: friend.gender,
      remark: friend.remark,
    });
  }

  onClickButton(event: BUTTON_NAME) {
    switch (event) {
      case BUTTON_NAME.SAVE:
        if (this.formGroup.valid) {
          if (this.dialogType === 'Add') {
            this._friendService
              .createFriend(this.formGroup.getRawValue())
              .subscribe({
                next: () => {
                  this._AppDialogService.closeDialog(true);
                },
                error: (err) => {
                  console.log(err.error?.message);
                },
              });
          } else if (this.dialogType === 'Edit') {
            this._friendService
              .editFriend(this.formGroup.getRawValue(), this.id ?? 0)
              .subscribe({
                next: () => {
                  this._AppDialogService.closeDialog(true);
                },
                error: (err) => {
                  console.log(err.error?.message);
                },
              });
          }
        }
        break;
      case BUTTON_NAME.CANCEL:
        this._AppDialogService.closeDialog();
        break;
      default:
        break;
    }
  }
}
