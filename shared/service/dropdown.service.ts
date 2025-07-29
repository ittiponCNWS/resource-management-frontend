import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRoleDropdown,
  IStatusDropdown,
} from '../interface/dropdown.interface';
import { environment } from '../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  baseUrl = environment.apiBaseURL;
  constructor(private _http: HttpClient) {}

  getRoleDropdownList(): Observable<[IRoleDropdown]> {
    return this._http.get<[IRoleDropdown]>(this.baseUrl + 'role');
  }

  getStatusDropdownList(): Observable<[IStatusDropdown]> {
    return this._http.get<[IStatusDropdown]>(this.baseUrl + 'status');
  }
}
