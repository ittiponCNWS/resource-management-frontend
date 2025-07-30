import { Injectable } from '@angular/core';
import { IRolePermissionRes } from '../../interface/role-permission.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  baseUrl = environment.apiBaseURL;

  constructor(private _http: HttpClient) {}
  getRolePermissionList(): Observable<IRolePermissionRes[]> {
    return this._http.get<IRolePermissionRes[]>(this.baseUrl + '/role');
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
