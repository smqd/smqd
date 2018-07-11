import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// App modules/components
import { LayoutModule } from './components/layout/layout.module';

// App Services
import { httpInterceptorProviders } from './interceptors';
import { BaseService } from './services/base.service';
import { DashboardService } from './services/dashboard.service';
import { ClientService } from './services/client.service';

// App views
import { MonitoringModule } from "./components/monitoring/monitoring.module";
import { PluginModule } from './components/plugin/plugin.module';
import { RouteService } from './services/route.service';
import { PaginationModule } from 'ngx-bootstrap';
//import { KeysPipe } from './constants/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    //KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    AppRoutingModule,
    LayoutModule,
    MonitoringModule,
    PluginModule
  ],
  providers: [
    httpInterceptorProviders,
    BaseService,
    DashboardService,
    ClientService,
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
