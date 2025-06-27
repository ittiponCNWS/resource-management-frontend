import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { AppDialogService } from '../../../../../shared/service/app-dialog.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-friend-page-dialog',
  templateUrl: './friend-page-dialog.component.html',
  styleUrls: ['./friend-page-dialog.component.scss'],
})
export class FriendPageDialogComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  formGroup: FormGroup;

  constructor(private _AppDialogService: AppDialogService) {
    this.formGroup = new FormGroup({
      fristName: new FormControl('Ittipon'),
      lastName: new FormControl('Chinawangso'),
      isFavorite: new FormControl(24),
      birthDay: new FormControl(new Date()),
      phoneNumber: new FormControl('0918850500'),
      gender: new FormControl('Male'),
      remark: new FormControl('None'),
    });
  }
  ngOnInit() {}

  onClickButton(event: BUTTON_NAME) {
    switch (event) {
      case BUTTON_NAME.ADD:
        this._AppDialogService.closeDialog(this.formGroup.getRawValue());
    }
  }
}
