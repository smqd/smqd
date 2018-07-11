import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutesComponent } from './routes/routes.component';
import { ClientsComponent } from './clients/clients.component';
import { PaginationModule } from 'ngx-bootstrap';
import { KeysPipe } from '../../constants/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    RoutesComponent,
    ClientsComponent,
    KeysPipe
  ],
  exports: [
    DashboardComponent,
    RoutesComponent,
    ClientsComponent
  ]
})
export class MonitoringModule { }
