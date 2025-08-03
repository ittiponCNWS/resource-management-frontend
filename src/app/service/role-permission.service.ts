import { Injectable } from '@angular/core';
import {
  IRolePermissionCreateReq,
  IRolePermissionRes,
  IRoleRes,
} from '../../interface/role-permission.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RolePermissionFactory } from '../model/role-permission';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  baseUrl = environment.apiBaseURL;
  rolePermissionFactory = new RolePermissionFactory();

  constructor(private _http: HttpClient) {}
  getRolePermissionList(): Observable<IRoleRes[]> {
    return this._http.get<IRoleRes[]>(this.baseUrl + '/role');
  }

  getRolePermissionByID(id: number): Observable<IRolePermissionRes> {
    return this._http.get<IRolePermissionRes>(this.baseUrl + '/role/' + id);
  }

  createRole(payload: IRolePermissionCreateReq): Observable<any> {
    const req = this.rolePermissionFactory.createRolePermissionReq(payload);
    return this._http.post<any>(this.baseUrl + '/role', req);
  }

  updateRole(payload: IRolePermissionCreateReq, id: number): Observable<any> {
    const req = this.rolePermissionFactory.editRolePermissionReq(payload, id);
    return this._http.put<any>(this.baseUrl + '/role', req);
  }

  deleteRole(roleList: IRoleRes[]): Observable<any> {
    const req = this.rolePermissionFactory.deleteRolePermissionReq(roleList);
    return this._http.delete<any>(this.baseUrl + '/role', {
      body: req,
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
