import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ITokenRes } from '../../interface/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  // userFactory = new AdminSettingFactory();

  constructor(private _http: HttpClient) {}

  signIn(loginObj: ILogin): Observable<ITokenRes> {
    return this._http.post<ITokenRes>(this.baseUrl + '/api/signin', loginObj);
  }
}
