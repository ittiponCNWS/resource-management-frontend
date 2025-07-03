import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../../../shared/const/shared.enum';
import { FormControl } from '@angular/forms';
import { RolePermissionService } from '../../service/role-permission.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-role-permission-page',
  templateUrl: './role-permission-page.component.html',
  styleUrls: ['./role-permission-page.component.scss'],
})
export class RolePermissionPageComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  rolePermissionList!: any[];
  selectedRolePermissionList!: any;
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
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
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
