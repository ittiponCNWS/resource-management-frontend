import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserList } from '../../interface/user-setting.interface';
import { MOCK_USERS } from '../../mock/admin-setting.mock';

@Injectable({
  providedIn: 'root',
})
export class AdminSettingService {
  constructor() {}
  getIUserList(): Observable<IUserList[]> {
    // return this._http
    //   .get<IUserList[]>('http://localhost:8080/api/role-permission')
    //   .pipe(catchError(this.handleError<IUserList[]>('getIUserListList', [])));
    return of(MOCK_USERS);
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
