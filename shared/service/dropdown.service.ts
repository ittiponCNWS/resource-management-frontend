import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  IPageDropdown,
  IRoleDropdown,
  IStatusDropdown,
} from '../interface/dropdown.interface';
import { environment } from '../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  baseUrl = environment.apiBaseURL;
  commonUrl = '/common';
  dropdownUrl = '/dropdown';
  constructor(private _http: HttpClient) {}

  getCommonPage(): Observable<IPageDropdown[]> {
    return this._http.get<IPageDropdown[]>(
      this.baseUrl + this.commonUrl + '/page'
    );
  }

  getRoleDropdownList(): Observable<[IRoleDropdown]> {
    return this._http.get<[IRoleDropdown]>(
      this.baseUrl + this.dropdownUrl + '/role'
    );
  }

  getStatusDropdownList(): Observable<[IStatusDropdown]> {
    return this._http.get<[IStatusDropdown]>(
      this.baseUrl + this.dropdownUrl + '/status'
    );
  }
}
