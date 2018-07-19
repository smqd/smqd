import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { BaseService } from './base.service';
import { Login } from '../models/login';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  loginUrl = '/auth/login';
  refreshUrl = '/auth/refresh';

  loginObj: Login;
  expired = false;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAccessToken() {
    return window.localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return window.localStorage.getItem('refresh_token');
  }

  getTokenType() {
    return window.localStorage.getItem('token_type');
  }

  login(credential: Object): Observable<any> {
    return this.httpClient.post(this.loginUrl, credential).pipe(
      map((res: Login) => {
        console.log('result = ', res);
        this.loginObj = res;
        localStorage.setItem('token_type', this.loginObj.result.token_type);
        this.updateAndValidateToken(this.loginObj.result.access_token, 'access_token');
        this.updateAndValidateToken(this.loginObj.result.refresh_token, 'refresh_token');

        return res;
      }),
      catchError(this.handleError('login'))
    );
  }

  logout = async() => {
    await this.removeAuthorizationToken();
    return 'done';
  }

  updateAndValidateToken(token, prefix) {
    const tokenData = jwt_decode(token);
    const expTime = tokenData.exp;
    console.log('expTime = ', expTime);
    localStorage.setItem('username', tokenData.identifier);
    localStorage.setItem(prefix, token);
    localStorage.setItem(prefix + '_expiration', expTime);
  }

  removeAuthorizationToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expiration');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('token_type');
  }

  isAuthTokenExpired(prefix) {
    const tokenExpiration = localStorage.getItem(prefix + '_expiration');
    if( tokenExpiration == null || (new Date().getTime() > parseInt(tokenExpiration+'000'))) {
      this.expired = true;
    } else {
      this.expired = false;
    }
    console.log(prefix + " token expired", this.expired)
    return this.expired;
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('call authService.refreshToken', refreshToken);
    if (refreshToken == null) {
      this.clearLocalStorage();
      return Observable.throw('refreshToken is not exist');
    }

    return this.httpClient.post(this.refreshUrl, {'refresh_token': refreshToken}).pipe(
      switchMap((res: Login) => {
        console.log('authService.refreshToken result', res);

        this.loginObj = res;
        localStorage.setItem('token_type', this.loginObj.result.token_type);
        this.updateAndValidateToken(this.loginObj.result.access_token, 'access_token');
        this.updateAndValidateToken(this.loginObj.result.refresh_token, 'refresh_token');

        return of(this.loginObj);
      }),
      catchError(error => {
        //this.clearLocalStorage();
        console.log('authService.refreshToken error ', error);
        return throwError(error);
      })
    );
  }
}
