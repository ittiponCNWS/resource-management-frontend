import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ITokenRes } from '../../interface/login.interface';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../../../shared/const';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseURL;
  // userFactory = new AdminSettingFactory();

  constructor(private _http: HttpClient) {}

  signIn(loginObj: ILogin): Observable<ITokenRes> {
    return this._http.post<ITokenRes>(this.baseUrl + '/signin', loginObj);
  }

  isLoggedIn() {
    return localStorage.getItem(TOKEN_KEY) != null ? true : false;
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token);
  }

  deleteToken() {
    return localStorage.removeItem(TOKEN_KEY);
  }

  getClaims() {
    return JSON.parse(window.atob(this.getToken()!.split('.')[1]));
  }
}
