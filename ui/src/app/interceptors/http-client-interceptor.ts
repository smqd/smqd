import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Config } from '../constants/config.constants';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  // endPoint = Config.httpEndpoint;
  // apiBaseUrl = Config.apiBaseUrl;
  platformUrl = `http://${Config.httpEndpoint}/${Config.apiBaseUrl}`;
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiUrl = this.platformUrl + req.url;
    const secureReq = req.clone({
      url : apiUrl
    });
    
    return next.handle(secureReq);
  }
}
