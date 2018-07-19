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
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';

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
      {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {path: 'clients', component: ClientsComponent, canActivate:[AuthGuard]},
      {path: 'routes', component: RoutesComponent, canActivate:[AuthGuard]},
      {path: 'subscriptions', component: SubscriptionsComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: 'plugin', component: BasicLayoutComponent,
    children: [
      {path: 'packages', component: PackagesComponent, canActivate:[AuthGuard]},
      {path: 'plugins', component: PluginsComponent, canActivate:[AuthGuard]},
      {path: ':plugin/:instance/config', component: ConfigComponent, canActivate:[AuthGuard], pathMatch: 'full'},
      {path: ':plugin/instance/add', component: AddConfigComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: 'user', component: BasicLayoutComponent,
    children: [
      {path: 'users', component: UserComponent, canActivate:[AuthGuard]},
      {path: 'add', component: AddUserComponent, canActivate:[AuthGuard]},
      {path: ':username', component: EditUserComponent, canActivate:[AuthGuard]}
    ]
  },
  {path: '**', component: NotFoundComponent},
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
