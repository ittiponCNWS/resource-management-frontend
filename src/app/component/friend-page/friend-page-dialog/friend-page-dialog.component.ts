import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { AppDialogService } from '../../../../../shared/service/app-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GENDER_DROPDOWN } from '../../const/dropdown.const';
import { FriendService } from '../../../service/friend.service';

@Component({
  selector: 'app-friend-page-dialog',
  templateUrl: './friend-page-dialog.component.html',
  styleUrls: ['./friend-page-dialog.component.scss'],
})
export class FriendPageDialogComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  formGroup: FormGroup;
  gendetDropdownOption = GENDER_DROPDOWN;
  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];

  constructor(
    private _AppDialogService: AppDialogService,
    private _friendService: FriendService
  ) {
    this.formGroup = new FormGroup({
      firstName: new FormControl('Ittipon', [Validators.required]),
      lastName: new FormControl('Chinawangso', [Validators.required]),
      isFavorite: new FormControl(false),
      birthDay: new FormControl(new Date(), [Validators.required]),
      phoneNumber: new FormControl('0918850500'),
      gender: new FormControl('Male', [Validators.required]),
      remark: new FormControl('None'),
    });
  }
  ngOnInit() {}

  onClickButton(event: BUTTON_NAME) {
    switch (event) {
      case BUTTON_NAME.SAVE:
        if (this.formGroup.valid) {
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
