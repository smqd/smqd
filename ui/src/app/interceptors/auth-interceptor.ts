import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject} from 'rxjs';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { flatMap, tap, switchMap } from 'rxjs/operators';
//import { HttpBuffer } from "./http-buffer";

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
    console.log(req, token)
    return req.clone({
      setHeaders: { 'X-Authorization': token}
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
    // if ((req.url.includes('login') || req.url.includes('token')) && req.method === 'POST') {
    //   console.log('login or token', req.url);
    //   return next.handle(req);
    // }
    // // Get the auth token from the service.
    // const authToken = this.authService.getAccessToken();
    // if (authToken != null) {
    //   // send cloned request with header to the next handler.
    //   if (this.authService.isAuthTokenExpired('access_token')) {
    //     return this.refreshToken(req, next);
    //   } else {
    //     return next.handle(this.setHeader(req, this.authService.getAccessToken()));
    //   }
    // }
  }

  // refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
  //   console.log('call refreshToken');
  //   if (!this.refreshTokenInProgress) {
  //     this.refreshTokenInProgress = true;
  //     // Reset here so that the following requests wait until the token
  //     // comes back from the refreshToken call.
  //     this.tokenSubject.next(null);
  
  //     return this.authService.refreshToken()
  //       .switchMap((resp) => { //emit last respones
  //         this.tokenSubject.next(resp.value['accessToken']);//setting new token
  //         this.refreshTokenInProgress = true;
  //         return next.handle(this.setHeader(req, resp.value['accessToken']));//change token excute next request
  //       })
  //       .catch(err => {
  //         console.log('refreshToken error..', err);
  //         this.authService.removeAuthorizationToken();
  //         this.refreshTokenInProgress = true;
  //         this.router.navigateByUrl('/login');
  //         return Observable.throw(err);
  //       })
  //       .finally(() => {
  //         this.refreshTokenInProgress = false;
  //       });
  //   } else {
  //     return this.tokenSubject
  //     .filter(token => token != null) //this token is new token
  //     .take(1)
  //     .switchMap(token => { //emit last token
  //       return next.handle(this.setHeader(req, token));
  //     });
  //   }
  // }

  isAuthError(error: any): boolean {
    return error instanceof HttpErrorResponse && error.status === 401;
  }
}
