import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FriendService } from '../../service/friend.service';
import { FormControl } from '@angular/forms';
import { AppDialogService } from '../../../../shared/service/app-dialog.service';
import { FriendPageDialogComponent } from './friend-page-dialog/friend-page-dialog.component';
import { LoadingService } from '../../../../shared/service/loading.service';
import { ToastService } from '../../../../shared/service/toast.service';
import { IFriendRes } from '../../../interface/friend.interface';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrl: './friend-page.component.scss',
})
export class FriendPageComponent {
  BUTTONNAME = BUTTON_NAME;
  friendList!: IFriendRes[];
  selectedFriendList!: any;
  searchField = new FormControl('');

  buttonGroup = [
    this.BUTTONNAME.ADD,
    this.BUTTONNAME.EDIT,
    this.BUTTONNAME.DELETE,
    this.BUTTONNAME.EXPORT,
  ];

  constructor(
    private _friendService: FriendService,
    private _appDialogService: AppDialogService,
    private _loadingService: LoadingService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.getFriendList();
  }

  getFriendList() {
    this._loadingService.show();
    this._friendService.getFriendList().subscribe({
      next: (res) => {
        this.friendList = res;
        this._loadingService.hide();
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.ADD: {
        this._appDialogService
          .openDialog(
            { headerDialog: 'Add Friend', data: null, dialogType: 'Add' },
            FriendPageDialogComponent
          )
          .onClose.subscribe((res) => {
            if (res === true) {
              this.getFriendList();
              this._toastService.showSuccess('Add Friend Success');
            }
          });
        break;
      }
      case BUTTON_NAME.EDIT: {
        this._appDialogService
          .openDialog(
            {
              headerDialog: 'Edit Friend',
              data: this.selectedFriendList[0],
              dialogType: 'Edit',
            },
            FriendPageDialogComponent
          )
          .onClose.subscribe((res) => {
            if (res === true) {
              this.getFriendList();
              this.selectedFriendList = [];
              this._toastService.showSuccess('Update Friend Success');
            }
          });
        break;
        break;
      }
      case BUTTON_NAME.DELETE: {
        this._appDialogService
          .openDeleteDialog({ dialogType: 'Delete' })
          .onClose.subscribe((res) => {
            if (res === true) {
              this._loadingService.show();
              this._friendService
                .deleteFriend(this.selectedFriendList)
                .subscribe({
                  next: () => {
                    this.selectedFriendList = [];
                    this._loadingService.hide();
                    this._toastService.showSuccess('Delete Friend Success');
                  },
                  error: (err) => {
                    this._loadingService.hide();
                  },
                  complete: () => {
                    this.getFriendList();
                  },
                });
            }
          });
        break;
      }
      case BUTTON_NAME.EXPORT: {
        break;
      }
      default:
        break;
    }
  }

  onSelectionChange(selectedItem: any) {}
}
