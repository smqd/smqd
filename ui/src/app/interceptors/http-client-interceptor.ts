import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Config } from '../constants/config.constants';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!environment.production) {
      const secureReq = this.setPlatformUrl(req);
      return next.handle(secureReq);
    }
    
    return next.handle(req);
  }
  
  setPlatformUrl(req) {
    let apiUrl = `http://${Config.httpEndpoint}/${Config.apiBaseUrl}` + req.url;
    const secureReq = req.clone({
      url : apiUrl
    });
    return secureReq;
  }

}
