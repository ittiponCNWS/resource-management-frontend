import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FriendService } from '../../service/friend.service';
import { FormControl } from '@angular/forms';
import { AppDialogService } from '../../../../shared/service/app-dialog.service';
import { FriendPageDialogComponent } from './friend-page-dialog/friend-page-dialog.component';
import { LoadingService } from '../../../../shared/service/loading.service';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrl: './friend-page.component.scss',
})
export class FriendPageComponent {
  BUTTONNAME = BUTTON_NAME;
  friendList!: any[];
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
    private _loadingService: LoadingService
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
            if (res === true) this.getFriendList();
          });
        break;
      }
      case BUTTON_NAME.EDIT: {
        console.log('EDIT Event');
        break;
      }
      case BUTTON_NAME.DELETE: {
        this._appDialogService
          .openDeleteDialog({ dialogType: 'Delete' })
          .onClose.subscribe((res) => {
            console.log(res);
            if (res === true) {
              this._loadingService.show();
              this._friendService
                .deleteFriend(this.selectedFriendList)
                .subscribe({
                  next: () => {
                    this.selectedFriendList = [];
                    this._loadingService.hide();
                  },
                  error: (err) => {
                    console.log(err.error.message);
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
        console.log('EXPORT Event');
        break;
      }
      default:
        break;
    }
  }

  onSelectionChange(selectedItem: any) {
    console.log(selectedItem);
  }
}
