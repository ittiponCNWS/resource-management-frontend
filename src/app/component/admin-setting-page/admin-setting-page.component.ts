import { Component } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FormControl } from '@angular/forms';
import { AdminSettingService } from '../../service/admin-setting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-setting-page',
  templateUrl: './admin-setting-page.component.html',
  styleUrl: './admin-setting-page.component.scss',
})
export class AdminSettingPageComponent {
  BUTTONNAME = BUTTON_NAME;
  selectedItem = [];
  adminList!: any[];
  selectedAdminList!: any;
  searchField = new FormControl('');

  buttonGroup = [
    this.BUTTONNAME.ADD,
    this.BUTTONNAME.EDIT,
    this.BUTTONNAME.DELETE,
    this.BUTTONNAME.EXPORT,
  ];

  constructor(
    private _adminSettingService: AdminSettingService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._adminSettingService.getIUserList().subscribe({
      next: (res) => {
        this.adminList = res;
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.ADD: {
        this._router.navigate(['admin-setting-page-detail'], {
          relativeTo: this._route,
        });
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
