import { Component, OnInit } from '@angular/core';
import {
  ACTION_TYPE,
  BUTTON_NAME,
} from '../../../../../shared/const/shared.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../../../../../shared/service/dropdown.service';
import { IPageDropdown } from '../../../../../shared/interface/dropdown.interface';
import { RolePermissionService } from '../../../service/role-permission.service';
import { ToastService } from '../../../../../shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IRolePermissionRes,
  IRoleRes,
} from '../../../../interface/role-permission.interface';
import { LoadingService } from '../../../../../shared/service/loading.service';

@Component({
  selector: 'app-role-permission-detail-page',
  templateUrl: './role-permission-detail-page.component.html',
  styleUrls: ['./role-permission-detail-page.component.scss'],
})
export class RolePermissionDetailPageComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  form!: FormGroup;
  actionType: ACTION_TYPE | null = null;
  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];
  id: number = 0;

  get permissions(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  pageList: IPageDropdown[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _fb: FormBuilder,
    private _dropdownService: DropdownService,
    private _roleService: RolePermissionService,
    private _toastService: ToastService,
    private _loadingService: LoadingService
  ) {
    this._route.queryParams.subscribe((params) => {
      this.actionType = params['actionType'];
      this.id = params['id'] ?? 0;
    });
  }

  ngOnInit() {
    this._dropdownService.getCommonPage().subscribe({
      next: (pages) => {
        this.pageList = pages;
        this.buildForm(); // 🔧 Build form after data is ready
        if (this.actionType !== ACTION_TYPE.ADD) {
          this.fetchUserById();
        }
      },
      error: (err) => {},
    });
  }

  buildForm() {
    this.form = this._fb.group({
      roleName: this._fb.control('', [Validators.required]),
      roleDescription: this._fb.control('', [Validators.required]),
      permissions: this._fb.array(
        this.pageList.map((page) =>
          this._fb.group({
            pageID: [page.pageID],
            pageName: [page.pageName],
            isView: [false],
            isCreate: [false],
            isEdit: [false],
            isDelete: [false],
            isExport: [false],
          })
        )
      ),
    });
  }

  fetchUserById() {
    this._roleService.getRolePermissionByID(this.id).subscribe({
      next: (roleList: IRolePermissionRes) => {
        console.log(roleList);
        this.form.patchValue(roleList);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Fetch user by ID error', err);
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.SAVE: {
        if (this.form.valid) {
          if (this.actionType === 'Add') {
            this._roleService.createRole(this.form.getRawValue()).subscribe({
              next: () => {
                this._router.navigate(['main/role-permission']);
                this._toastService.showSuccess('Add Role Success.');
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error?.message);
              },
            });
          } else if (this.actionType === 'Edit') {
            this._roleService
              .updateRole(this.form.getRawValue(), this.id ?? 0)
              .subscribe({
                next: () => {
                  this._router.navigate(['main/role-permission']);
                  this._toastService.showSuccess('Update Role Success.');
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err.error?.message);
                },
              });
          }
        } else {
          this.form.markAllAsTouched();
        }
        break;
      }
      case BUTTON_NAME.CANCEL: {
        this._location.back();
        break;
      }
      default:
        break;
    }
  }
}
