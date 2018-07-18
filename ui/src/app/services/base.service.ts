import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class BaseService {

  constructor() { }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' error....', error); // log to console instead
      // Let the app keep running by returning an empty result.
      //return of(error.error as T);
      return throwError(error.error);
    };
  }

  protected _throwError(error: any): Observable<Response> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error('baseService error', errMsg); // log to console instead
    return throwError(errMsg);
  }
}
