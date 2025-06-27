import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FriendService } from '../../service/friend.service';
import { FormControl } from '@angular/forms';
import { AppDialogService } from '../../../../shared/service/app-dialog.service';
import { FriendPageDialogComponent } from './friend-page-dialog/friend-page-dialog.component';

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
    private _appDialogService: AppDialogService
  ) {}

  ngOnInit() {
    this._friendService.getFriendList().subscribe({
      next: (res) => {
        this.friendList = res;
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.ADD: {
        this._appDialogService
          .openDialog('Add Friend', FriendPageDialogComponent)
          .onClose.subscribe((res) => {
            console.log('Close Success', res);
          });
        break;
      }
      case BUTTON_NAME.EDIT: {
        console.log('EDIT Event');
        break;
      }
      case BUTTON_NAME.DELETE: {
        console.log('DELETE Event');
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
