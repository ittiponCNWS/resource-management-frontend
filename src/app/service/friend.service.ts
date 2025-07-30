import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IFriendRes, IDeletePayload } from '../../interface/friend.interface';
import { HttpClient } from '@angular/common/http';
import { FriendFactory } from '../model/friend.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  baseUrl = environment.apiBaseURL;
  friendFactory = new FriendFactory();

  constructor(private _http: HttpClient) {}

  getFriendList(): Observable<IFriendRes[]> {
    return this._http
      .get<IFriendRes[]>(this.baseUrl + '/friend')
      .pipe(catchError(this.handleError<IFriendRes[]>('getFriendList', [])));
  }

  createFriend(payload: IFriendRes): Observable<any> {
    const req = this.friendFactory.createFriend(payload);
    return this._http.post<IFriendRes>(this.baseUrl + '/friend', req);
  }

  editFriend(payload: IFriendRes, id: number): Observable<any> {
    const req = this.friendFactory.editFriend(payload, id);
    return this._http.put<IFriendRes>(this.baseUrl + '/friend', req);
  }

  deleteFriend(friendList: IFriendRes[]): Observable<any> {
    const req = this.friendFactory.deleteFriendReq(friendList);
    console.log(req);
    return this._http.delete<IDeletePayload>(this.baseUrl + '/friend', {
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
