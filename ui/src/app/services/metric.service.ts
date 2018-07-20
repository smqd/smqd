import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Base } from '../models/base';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MetricService extends BaseService{

  metricUrl = '/metrics';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getMetrics(): Observable<Base> {
    return this.httpClient.get<Base>(this.metricUrl).pipe(
      //tap(_ => console.log(`fetched metrics`)),
      catchError(this.handleError<Base>(`getMetrics`))
    );
  }

  getMetric(subUrl: string): Observable<Base> {
    const url = `${this.metricUrl}/${subUrl}`;
    return this.httpClient.get<Base>(url).pipe(
      //tap(_ => console.log(`fetched metric ` + subUrl)),
      catchError(this.handleError<Base>(`getMetric ` + subUrl))
    );
  }
}
