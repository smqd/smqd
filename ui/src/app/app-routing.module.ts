import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './components/layout/basic-layout/basic-layout.component';
import { DashboardComponent } from './views/dashboards/dashboard.component';

const routes: Routes = [
  // Main redirect
  {path: '', redirectTo: 'dashboards', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: '', component: DashboardComponent}
    ]
  },
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
