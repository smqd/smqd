import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { PluginsResult, PluginResult, InstanceResult, ConfigResult } from '../models/plugin';

@Injectable({
  providedIn: 'root'
})
export class PluginService extends BaseService{

  pluginsUrl = '/management/plugins';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getPlugins(condition): Observable<PluginsResult> {
    return this.httpClient.get<PluginsResult>(this.pluginsUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched plugins`)),
      catchError(this.handleError<PluginsResult>(`getPlugins`))
    );
  }

  getPlugin(condition): Observable<PluginResult> {
    return this.httpClient.get<PluginResult>(this.pluginsUrl, {params: condition}).pipe(
      tap(_ => console.log(`fetched plugin`)),
      catchError(this.handleError<PluginResult>(`getPlugin`))
    );
  }

  /* instance */
  stopInstance(pluginName: string, instanceName: string): Observable<Object | InstanceResult> {
    //const name = typeof device === 'string' ? device : device.deviceName;
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/stop`;
    return this.httpClient.put<InstanceResult>(url, '').pipe(
      catchError(this.handleError('stopInstance'))
    );
  }

  startInstance(pluginName: string, instanceName: string): Observable<Object | InstanceResult> {
    //const name = typeof device === 'string' ? device : device.deviceName;
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/start`;
    return this.httpClient.put<InstanceResult>(url, '').pipe(
      catchError(this.handleError('stopInstance'))
    );
  }

  /* config */
  getConfig(pluginName: string, instanceName: string): Observable<ConfigResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/config`;
    return this.httpClient.get<ConfigResult>(url).pipe(
      tap(_ => console.log(`fetched config`)),
      catchError(this.handleError<PluginsResult>(`getConfig`))
    );
  }

}
