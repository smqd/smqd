import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './components/layout/basic-layout/basic-layout.component';
import { DashboardComponent } from './components/monitoring/dashboard/dashboard.component';
import { PackagesComponent } from './components/plugin/packages/packages.component';
import { PluginsComponent } from './components/plugin/plugins/plugins.component';
import { ClientsComponent } from './components/monitoring/clients/clients.component';
import { RoutesComponent } from './components/monitoring/routes/routes.component';
import { ConfigComponent } from './components/plugin/config/config.component';
import { AddConfigComponent } from './components/plugin/config/add-config/add-config.component';
import { SubscriptionsComponent } from './components/monitoring/subscriptions/subscriptions.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // Main redirect
  {path: '', redirectTo: 'monitoring/dashboard', pathMatch: 'full'},

  // App view
  {
    path: 'login', component: LoginComponent
  }, 
  {
    path: 'monitoring', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'routes', component: RoutesComponent},
      {path: 'subscriptions', component: SubscriptionsComponent}
    ]
  },
  {
    path: 'plugin', component: BasicLayoutComponent,
    children: [
      {path: 'packages', component: PackagesComponent},
      {path: 'plugins', component: PluginsComponent},
      {path: ':plugin/:instance/config', component: ConfigComponent, pathMatch: 'full'},
      {path: ':plugin/instance/add', component: AddConfigComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
