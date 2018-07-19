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
import { SubscriptionService } from './services/subscription.service';
import { PluginService } from './services/plugin.service';
import { PackageService } from './services/package.service';

// App views
import { MonitoringModule } from "./components/monitoring/monitoring.module";
import { PluginModule } from './components/plugin/plugin.module';
import { RouteService } from './services/route.service';
import { PaginationModule } from 'ngx-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent
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
    AuthGuard,
    httpInterceptorProviders,
    BaseService,
    AuthService,
    DashboardService,
    ClientService,
    RouteService,
    SubscriptionService,
    PluginService,
    PackageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
