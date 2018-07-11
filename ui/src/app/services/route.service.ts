import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Routes } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseService{

  routesUrl = '/routes';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getRoutes(condition): Observable<Routes> {
    return this.httpClient.get<Routes>(this.routesUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched routes`)),
      catchError(this.handleError<Routes>(`getRoutes`))
    );
  }
}