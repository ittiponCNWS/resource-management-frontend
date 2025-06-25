import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrl: './friend-page.component.scss',
})
export class FriendPageComponent {
  BUTTONNAME = BUTTON_NAME;
  friendList!: any[];
  selectedFriendList!: any;

  buttonGroup = [
    this.BUTTONNAME.ADD,
    this.BUTTONNAME.EDIT,
    this.BUTTONNAME.DELETE,
    this.BUTTONNAME.EXPORT,
  ];

  constructor(private _friendService: FriendService) {}

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
        console.log('ADD Event');
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
