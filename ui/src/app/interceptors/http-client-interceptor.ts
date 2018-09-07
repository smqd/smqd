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

    const secureReq = this.setPlatformUrl(req);
    return next.handle(secureReq);
  }
  
  setPlatformUrl(req) {
    let apiUrl = `${Config.apiBaseUrl}` + req.url;
    if (environment.production) {
     apiUrl = `http://${location.host}/` + apiUrl;
    } else {
      apiUrl = `http://${Config.httpEndpoint}/` + apiUrl;
    }
    
    const secureReq = req.clone({
      url : apiUrl
    });
    return secureReq;
  }

}
