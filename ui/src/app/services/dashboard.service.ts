import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Version, NodesResult } from '../models/dashboard';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  versionUrl = '/management/version';
  nodesUrl = '/management/nodes';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getVersion(): Observable<Version> {
    return this.httpClient.get<Version>(this.versionUrl).pipe(
      tap(_ => console.log(`fetched version`)),
      catchError(this.handleError<Version>(`getVersion`))
    );
  }

  getNodes(): Observable<NodesResult> {
    return this.httpClient.get<NodesResult>(this.nodesUrl).pipe(
      tap(_ => console.log(`fetched nodes`)),
      catchError(this.handleError<NodesResult>(`getNodes`))
    );
  }

  // getNode
}
