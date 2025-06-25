import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Friend } from '../../models/friend.interface';
import { HttpClient } from '@angular/common/http';
import { MOCK_FRIEND_LIST } from '../../mock/friend.mock';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private _http: HttpClient) {}

  getFriendList(): Observable<Friend[]> {
    // return this._http
    //   .get<Friend[]>('http://localhost:8080/api/friend')
    //   .pipe(catchError(this.handleError<Friend[]>('getFriendList', [])));
    return of(MOCK_FRIEND_LIST);
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
