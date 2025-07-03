import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../const/shared.enum';
import { AppDialogService } from '../../service/app-dialog.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  dialogConfig: { dialogType: 'Delete' | null };

  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];

  constructor(
    private _appDialogService: AppDialogService,
    public _config: DynamicDialogConfig
  ) {
    this.dialogConfig = this._config.data;
  }

  ngOnInit() {}

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.SAVE: {
        this._appDialogService.closeDialog(true);
        break;
      }
      case BUTTON_NAME.CANCEL: {
        this._appDialogService.closeDialog(false);
        break;
      }
      default:
        break;
    }
  }
}
