import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Packages, PackageExact } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends BaseService{
  packagesUrl = '/management/packages';

  constructor(private httpClient: HttpClient) {
    super();
  }
  getPackages(condition): Observable<Packages> {
    return this.httpClient.get<Packages>(this.packagesUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched plugins`)),
      catchError(this.handleError<Packages>(`getPackages`))
    );
  }

  getPackage(condition): Observable<PackageExact> {
    return this.httpClient.get<PackageExact>(this.packagesUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched plugin`)),
      catchError(this.handleError<PackageExact>(`getPlugin`))
    );
  }

  packageInstall(packageName:string): Observable<Object> {
    const url = `${this.packagesUrl}/${packageName}/install`;
    return this.httpClient.put(url, '').pipe(
      catchError(this.handleError('packageInstall'))
    );
  }

  packageReload(packageName:string): Observable<Object> {
    const url = `${this.packagesUrl}/${packageName}/reload`;
    return this.httpClient.put(url, '').pipe(
      catchError(this.handleError('packageReload'))
    );
  }
}
