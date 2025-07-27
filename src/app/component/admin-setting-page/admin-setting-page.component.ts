import { Component } from '@angular/core';
import { ACTION_TYPE, BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FormControl } from '@angular/forms';
import { AdminSettingService } from '../../service/admin-setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../interface/user-setting.interface';
import { AppDialogService } from '../../../../shared/service/app-dialog.service';
import { LoadingService } from '../../../../shared/service/loading.service';
import { ToastService } from '../../../../shared/service/toast.service';

@Component({
  selector: 'app-admin-setting-page',
  templateUrl: './admin-setting-page.component.html',
  styleUrl: './admin-setting-page.component.scss',
})
export class AdminSettingPageComponent {
  BUTTONNAME = BUTTON_NAME;
  adminList!: IUser[];
  selectedAdminList!: any[];
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
    private _route: ActivatedRoute,
    private _appDialogService: AppDialogService,
    private _loadingService: LoadingService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.getUserList();
  }

  private getUserList() {
    this._loadingService.show();
    this._adminSettingService.getIUserList().subscribe({
      next: (res) => {
        this.adminList = res;
        this._loadingService.hide();
      },
      error: () => {
        this._loadingService.hide();
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.ADD: {
        this._router.navigate(['admin-setting-page-detail'], {
          relativeTo: this._route,
          queryParams: {
            actionType: ACTION_TYPE.ADD,
          },
        });
        break;
      }
      case BUTTON_NAME.EDIT: {
        this._router.navigate(['admin-setting-page-detail'], {
          relativeTo: this._route,
          queryParams: {
            actionType: ACTION_TYPE.EDIT,
            userID: this.selectedAdminList[0].userID,
          },
        });
        break;
      }
      case BUTTON_NAME.DELETE: {
        this._appDialogService
          .openDeleteDialog({ dialogType: 'Delete' })
          .onClose.subscribe((res) => {
            if (res === true) {
              this._loadingService.show();
              this._adminSettingService
                .deleteUser(this.selectedAdminList)
                .subscribe({
                  next: () => {
                    this.selectedAdminList = [];
                    this._loadingService.hide();
                    this._toastService.showSuccess('Delete User Success.');
                  },
                  error: (err) => {
                    this._loadingService.hide();
                  },
                  complete: () => {
                    this.getUserList();
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
