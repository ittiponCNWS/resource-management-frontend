import { Component, OnInit } from '@angular/core';
import { BUTTON_NAME } from '../../../../../shared/const/shared.enum';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-role-permission-detail-page',
  templateUrl: './role-permission-detail-page.component.html',
  styleUrls: ['./role-permission-detail-page.component.scss'],
})
export class RolePermissionDetailPageComponent implements OnInit {
  BUTTONNAME = BUTTON_NAME;
  form!: FormGroup;

  get permissions(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  pageList = [
    { name: 'Home' },
    { name: 'Friend' },
    { name: 'Role Permission' },
    { name: 'Admin Setting' },
    { name: 'Page Role 1' },
    { name: 'Page Role 2' },
    { name: 'Page Role 3' },
    { name: 'Page Role 4' },
    { name: 'Page Role 1' },
    { name: 'Page Role 2' },
    { name: 'Page Role 3' },
    { name: 'Page Role 4' },
  ];

  constructor(
    private _router: Router,
    private _location: Location,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      roleName: this._fb.control(''),
      permissions: this._fb.array(
        this.pageList.map((page) =>
          this._fb.group({
            pageName: [page.name],
            view: [false],
            create: [false],
            edit: [false],
            delete: [false],
            export: [false],
          })
        )
      ),
    });
  }

  buttonGroup = [this.BUTTONNAME.SAVE, this.BUTTONNAME.CANCEL];

  onClickButton(eventType: BUTTON_NAME) {
    switch (eventType) {
      case BUTTON_NAME.SAVE: {
        console.log(this.form.getRawValue());
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
