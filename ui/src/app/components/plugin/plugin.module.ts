import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { PackagesComponent } from './packages/packages.component';
import { PluginsComponent } from './plugins/plugins.component';
import { ConfigComponent } from './config/config.component';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { KeystringPipe } from '../../constants/keystring.pipe';
import { InputComponent } from './config/input/input.component';
import { SelectComponent } from './config/select/select.component';
import { AddConfigComponent } from './config/add-config/add-config.component';
import { SectionComponent } from './config/section/section.component';
import { KeyobjectPipe } from '../../constants/keyobject.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule.forRoot(),
    MonitoringModule
  ],
  declarations: [
    PackagesComponent,
    PluginsComponent,
    ConfigComponent,
    KeystringPipe,
    KeyobjectPipe,
    InputComponent,
    SelectComponent,
    AddConfigComponent,
    SectionComponent
  ],
  exports: [
    PackagesComponent,
    PluginsComponent,
    ConfigComponent,
    KeystringPipe,
    SelectComponent,
    AddConfigComponent,
    SectionComponent
  ]
})
export class PluginModule { }
