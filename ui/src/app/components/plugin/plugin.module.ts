import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';

import { PackagesComponent } from './packages/packages.component';
import { PluginsComponent } from './plugins/plugins.component';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { KeystringPipe } from '../../pipe/keystring.pipe';
import { InputComponent } from './config/input/input.component';
import { SelectComponent } from './config/select/select.component';
import { AddConfigComponent } from './config/add-config/add-config.component';
import { EditConfigComponent } from './config/edit-config/edit-config.component';
import { SectionComponent } from './config/section/section.component';
import { KeyobjectPipe } from '../../pipe/keyobject.pipe';
import { PluginFailureComponent } from './plugin-failure/plugin-failure.component';
import { TextareaComponent } from './config/textarea/textarea.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule.forRoot(),
    MonitoringModule,
    UiSwitchModule.forRoot({
      //size: 'large',
      // color: 'rgb(0, 189, 99)',
      // switchColor: '#80FFA2',
      // defaultBgColor: '#00ACFF',
      defaultBoColor : '#313437',
    })
  ],
  declarations: [
    PackagesComponent,
    PluginsComponent,
    KeystringPipe,
    KeyobjectPipe,
    InputComponent,
    SelectComponent,
    AddConfigComponent,
    EditConfigComponent,
    SectionComponent,
    PluginFailureComponent,
    TextareaComponent
  ],
  exports: [
    PackagesComponent,
    PluginsComponent,
    EditConfigComponent,
    KeystringPipe,
    SelectComponent,
    AddConfigComponent,
    SectionComponent,
    PluginFailureComponent
  ]
})
export class PluginModule { }
