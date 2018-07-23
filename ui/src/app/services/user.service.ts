import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UsersResult, UserResult, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  baseUrl = '/auth/users';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getUsers(): Observable<UsersResult> {
    return this.httpClient.get<UsersResult>(this.baseUrl).pipe(
      //tap(_ => console.log(`fetched plugins`)),
      catchError(this.handleError<UsersResult>(`getUsers`))
    );
  }

  getUser(userName: string): Observable<UserResult> {
    const url = `${this.baseUrl}/${userName}`;
    return this.httpClient.get<UserResult>(url).pipe(
      //tap(_ => console.log(`fetched plugin`)),
      catchError(this.handleError<UserResult>(`getUser`))
    );
  }

  createUser(user:User): Observable<Object | UserResult> {
    return this.httpClient.post<UserResult>(this.baseUrl, user).pipe(
      catchError(this.handleError('crateUser'))
    );
  }

  removeUser(userName: string): Observable<Object | UserResult> {
    const url = `${this.baseUrl}/${userName}`;
    return this.httpClient.delete<UserResult>(url).pipe(
      catchError(this.handleError('removeUser'))
    );
  }

  modifyUser(userName: string, params: object): Observable<Object | UserResult> {
    const url = `${this.baseUrl}/${userName}`;
    return this.httpClient.patch<UserResult>(url, params).pipe(
      catchError(this.handleError('modifyUser'))
    );
  }

}
