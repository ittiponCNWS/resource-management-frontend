import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRoleDropdown,
  IStatusDropdown,
} from '../interface/dropdown.interface';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  baseUrl = 'http://localhost:8080/api/dropdown/';
  constructor(private _http: HttpClient) {}

  getRoleDropdownList(): Observable<[IRoleDropdown]> {
    return this._http.get<[IRoleDropdown]>(this.baseUrl + 'role');
  }

  getStatusDropdownList(): Observable<[IStatusDropdown]> {
    return this._http.get<[IStatusDropdown]>(this.baseUrl + 'status');
  }
}
