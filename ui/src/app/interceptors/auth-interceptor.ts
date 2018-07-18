import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, of} from 'rxjs';
import { switchMap, filter, take, map, catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  noAuth = ['login', 'token'];

  refreshTokenInProgress: boolean = false;
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  tokenRefreshed$ = this.tokenSubject.asObservable();

  constructor(private authService: AuthService, private router: Router) {}

  setHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // Clone the request and replace th original headers with
    // cloned headers, updated with th authorization.
    const token_type = this.authService.getTokenType();
    //console.log(req, token)
    return req.clone({
      setHeaders: { 'Authorization': token_type + ' ' + token}
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return next.handle(req);
    if ((req.url.includes('login') || req.url.includes('refresh')) && req.method === 'POST') {
      console.log('login or token', req.url);
      if (req.url.includes('refresh')) {
        return next.handle(this.setHeader(req, this.authService.getAccessToken()));
      }
      return next.handle(req);
    }
    console.log('interceptor...', req.url);
    // Get the auth token from the service.
    const authToken = this.authService.getAccessToken();
    if (authToken != null) {
      if (this.authService.isAuthTokenExpired('access_token')) {
        return this.refreshToken(req, next);
      } else {
        return next.handle(this.setHeader(req, this.authService.getAccessToken()));
      }
    } else {
      this.router.navigateByUrl('/login');
      return;
    }
  }

  refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('401 error call refreshToken', this.refreshTokenInProgress);
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((resp) => { //emit last respones
          console.log('resp', resp);
          this.tokenSubject.next(resp['result']['access_token']);//setting new token
          this.refreshTokenInProgress = false;
          return next.handle(this.setHeader(req, resp['result']['access_token']));//change token excute next request
        }),
        catchError(err => {
          console.log('interceptor.refreshToken error..', err);
          this.authService.removeAuthorizationToken();
          this.refreshTokenInProgress = false;
          this.router.navigateByUrl('/login');
          return of(err);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null), //this token is new token
        take(1),
        switchMap(token => { //emit last token
          console.log('interceptor.token = ', token);
          return next.handle(this.setHeader(req, token));
        })
      );
    }
  }

  isAuthError(error: any): boolean {
    return error instanceof HttpErrorResponse && error.status === 401;
  }
}
