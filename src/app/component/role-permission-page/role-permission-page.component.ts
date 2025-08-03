import { Component, OnInit } from '@angular/core';
import { ACTION_TYPE, BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FormControl } from '@angular/forms';
import { RolePermissionService } from '../../service/role-permission.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IRoleRes } from '../../../interface/role-permission.interface';
import { AppDialogService } from '../../../../shared/service/app-dialog.service';
import { LoadingService } from '../../../../shared/service/loading.service';
import { ToastService } from '../../../../shared/service/toast.service';

@Component({
  selector: 'app-role-permission-page',
  templateUrl: './role-permission-page.component.html',
  styleUrls: ['./role-permission-page.component.scss'],
})
export class RolePermissionPageComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  rolePermissionList!: IRoleRes[];
  selectedRolePermissionList!: IRoleRes[];
  searchField = new FormControl('');

  buttonGroup = [
    this.BUTTONNAME.ADD,
    this.BUTTONNAME.EDIT,
    this.BUTTONNAME.DELETE,
    this.BUTTONNAME.EXPORT,
  ];

  constructor(
    private _rolePermisisonService: RolePermissionService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _appDialogService: AppDialogService,
    private _loadingService: LoadingService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this._rolePermisisonService.getRolePermissionList().subscribe({
      next: (res) => {
        this.rolePermissionList = res;
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.ADD: {
        this._router.navigate(['role-permission-detail-page'], {
          relativeTo: this._route,
          queryParams: {
            actionType: ACTION_TYPE.ADD,
          },
        });
        break;
      }
      case BUTTON_NAME.EDIT: {
        this._router.navigate(['role-permission-detail-page'], {
          relativeTo: this._route,
          queryParams: {
            actionType: ACTION_TYPE.EDIT,
            id: this.selectedRolePermissionList[0].roleID,
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
              this._rolePermisisonService
                .deleteRole(this.selectedRolePermissionList)
                .subscribe({
                  next: () => {
                    this.selectedRolePermissionList = [];
                    this._loadingService.hide();
                    this._toastService.showSuccess('Delete Role Success');
                  },
                  error: (err) => {
                    this._loadingService.hide();
                  },
                  complete: () => {
                    this.getRoleList();
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
