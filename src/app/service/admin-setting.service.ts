import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../../interface/user-setting.interface';
import { HttpClient } from '@angular/common/http';
import { IDeletePayload } from '../../interface/friend.interface';
import { AdminSettingFactory } from '../model/admin-setting.model';

@Injectable({
  providedIn: 'root',
})
export class AdminSettingService {
  baseUrl = 'http://localhost:8080';
  userFactory = new AdminSettingFactory();

  constructor(private _http: HttpClient) {}
  getIUserList(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.baseUrl + '/api/usersetting');
    // return of(MOCK_USERS);
  }

  getUserByID(userID: number): Observable<IUser> {
    return this._http.get<IUser>(this.baseUrl + '/api/usersetting/' + userID);
  }

  createUser(payload: IUser): Observable<any> {
    const req = this.userFactory.createUser(payload);
    return this._http.post<IUser>(this.baseUrl + '/api/usersetting', req);
    // return of(MOCK_FRIEND_LIST);
  }

  editUser(payload: IUser, id: number): Observable<any> {
    const req = this.userFactory.updateUser(payload, id);
    return this._http.put<IUser>(this.baseUrl + '/api/usersetting', req);
    // return of(MOCK_FRIEND_LIST);
  }

  deleteUser(friendList: IUser[]): Observable<any> {
    const req = this.userFactory.deleteUserReq(friendList);
    console.log(req);
    return this._http.delete<IDeletePayload>(
      this.baseUrl + '/api/usersetting',
      {
        body: req,
      }
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
