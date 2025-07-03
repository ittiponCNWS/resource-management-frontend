import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Friend, IFriendDeleteRequest } from '../../interface/friend.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCK_FRIEND_LIST } from '../../mock/friend.mock';
import { FriendFactory } from '../model/friend.model';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  baseUrl = 'http://localhost:8080';
  friendFactory = new FriendFactory();

  constructor(private _http: HttpClient) {}

  getFriendList(): Observable<Friend[]> {
    return this._http
      .get<Friend[]>(this.baseUrl + '/api/friend')
      .pipe(catchError(this.handleError<Friend[]>('getFriendList', [])));
    // return of(MOCK_FRIEND_LIST);
  }

  createFriend(payload: Friend): Observable<any> {
    const req = this.friendFactory.createFriend(payload);
    return this._http.post<Friend>(this.baseUrl + '/api/friend', req);
    // return of(MOCK_FRIEND_LIST);
  }

  editFriend(payload: Friend): Observable<Friend[]> {
    return this._http.post<Friend[]>(this.baseUrl + '/api/friend', payload);
    // return of(MOCK_FRIEND_LIST);
  }

  deleteFriend(friendList: Friend[]): Observable<any> {
    const req = this.friendFactory.deleteFriendReq(friendList);
    console.log(req);
    return this._http.delete<IFriendDeleteRequest>(
      this.baseUrl + '/api/friend',
      { body: req }
    );
    // return of(MOCK_FRIEND_LIST);
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
