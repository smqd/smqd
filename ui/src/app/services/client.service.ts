import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Clients } from '../models/client';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService{

  clientsUrl = '/clients';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getClients(condition): Observable<Clients> {
    return this.httpClient.get<Clients>(this.clientsUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched clients`)),
      catchError(this.handleError<Clients>(`getClients`))
    );
  }

  // getNode
}
