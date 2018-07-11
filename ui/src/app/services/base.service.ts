import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

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
      // TODO: send the error to remote logging infrastructure
      console.error(operation + ' error....', error); // log to console instead
      console.error(operation + ' error result ....', result); 
      //alert(error.message);
      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return Observable.throw(error);
    };
  }

  protected _throwError(error: any): Observable<Response> {
    //this._refreshObservable = null;
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
