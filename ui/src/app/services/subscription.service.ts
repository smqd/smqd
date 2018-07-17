import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Subscriptions } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService{

  baseUrl = '/subscriptions';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getSubscriptions(condition): Observable<Subscriptions> {
    return this.httpClient.get<Subscriptions>(this.baseUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched subscriptions`)),
      catchError(this.handleError<Subscriptions>(`getSubscriptions`))
    );
  }

  // getNode
}
