import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap';
import { MqttComponent } from './mqtt/mqtt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeComponent } from './mqtt/subscribe/subscribe.component';
import { PublishComponent } from './mqtt/publish/publish.component'

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MqttComponent,
    SubscribeComponent,
    PublishComponent
  ],
  exports: [
    MqttComponent
  ]
})
export class ToolsModule { }