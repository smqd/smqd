import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutesComponent } from './routes/routes.component';
import { ClientsComponent } from './clients/clients.component';
import { PaginationModule } from 'ngx-bootstrap';
import { KeysPipe } from '../../pipe/keys.pipe';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { StartsWithPipe } from '../../pipe/starts-with.pipe';
import { BytePipe } from '../../pipe/byte.pipe'

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    RoutesComponent,
    ClientsComponent,
    SubscriptionsComponent,
    KeysPipe,
    StartsWithPipe,
    BytePipe
  ],
  exports: [
    DashboardComponent,
    RoutesComponent,
    ClientsComponent,
    SubscriptionsComponent,
    KeysPipe,
    StartsWithPipe,
    BytePipe
  ]
})
export class MonitoringModule { }
