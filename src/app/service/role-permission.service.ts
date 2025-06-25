import { Injectable } from '@angular/core';
import { RolePermission } from '../../models/role-permission.interface';
import { Observable, of } from 'rxjs';
import { MOCK_ROLE_PERMISSIONS } from '../../mock/role-permission.mock';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  constructor() {}
  getRolePermissionList(): Observable<RolePermission[]> {
    // return this._http
    //   .get<RolePermission[]>('http://localhost:8080/api/role-permission')
    //   .pipe(catchError(this.handleError<RolePermission[]>('getRolePermissionList', [])));
    return of(MOCK_ROLE_PERMISSIONS);
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
