import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages/packages.component';
import { PluginsComponent } from './plugins/plugins.component';
import { PaginationModule } from 'ngx-bootstrap';
import { ConfigComponent } from './config/config.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    PackagesComponent,
    PluginsComponent,
    ConfigComponent
  ],
  exports: [
    PackagesComponent,
    PluginsComponent
  ]
})
export class PluginModule { }
