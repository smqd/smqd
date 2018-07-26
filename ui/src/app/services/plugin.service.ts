import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { PluginsResult, PluginResult, InstanceResult, InstanceConfigResult, PluginConfigResult, InstanceFailureResult } from '../models/plugin';

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
      //tap(_ => console.log(`fetched plugins`)),
      catchError(this.handleError<PluginsResult>(`getPlugins`))
    );
  }

  getPlugin(condition): Observable<PluginResult> {
    return this.httpClient.get<PluginResult>(this.pluginsUrl, {params: condition}).pipe(
      //tap(_ => console.log(`fetched plugin`)),
      catchError(this.handleError<PluginResult>(`getPlugin`))
    );
  }

  /* instance */
  createInstance(pluginName: string, instanceName: string, config:Object): Observable<Object | InstanceResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}`;
    return this.httpClient.post<InstanceResult>(url, config).pipe(
      catchError(this.handleError('crateInstance'))
    );
  }

  removeInstance(pluginName: string, instanceName: string): Observable<Object | InstanceResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}`;
    return this.httpClient.delete<InstanceResult>(url).pipe(
      catchError(this.handleError('removeInstance'))
    );
  }

  stopInstance(pluginName: string, instanceName: string): Observable<Object | InstanceResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/stop`;
    return this.httpClient.put<InstanceResult>(url, '').pipe(
      catchError(this.handleError('stopInstance'))
    );
  }

  startInstance(pluginName: string, instanceName: string): Observable<Object | InstanceResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/start`;
    return this.httpClient.put<InstanceResult>(url, '').pipe(
      catchError(this.handleError('stopInstance'))
    );
  }

  getInstanceStatus(pluginName: string, instanceName: string): Observable<InstanceFailureResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}`;
    return this.httpClient.get<InstanceFailureResult>(url).pipe(
      catchError(this.handleError<InstanceFailureResult>(`getIntanceStatus`))
    );
  }

  /* config */
  getPluginConfig(pluginName: string): Observable<PluginConfigResult> {
    const url = `${this.pluginsUrl}/${pluginName}/config`;
    return this.httpClient.get<PluginConfigResult>(url).pipe(
      catchError(this.handleError<PluginConfigResult>(`getPluginConfig`))
    );
  }

  getInstanceConfig(pluginName: string, instanceName: string): Observable<InstanceConfigResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}/config`;
    return this.httpClient.get<InstanceConfigResult>(url).pipe(
      catchError(this.handleError<InstanceConfigResult>(`getInstanceConfig`))
    );
  }

  modifyInstanceConfig(pluginName: string, instanceName: string, config:Object): Observable<Object | InstanceConfigResult> {
    const url = `${this.pluginsUrl}/${pluginName}/instances/${instanceName}`;
    return this.httpClient.patch<InstanceConfigResult>(url, config).pipe(
      catchError(this.handleError('modifyInstanceConfig'))
    );
  }

}
