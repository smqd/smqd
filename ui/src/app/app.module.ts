import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// App modules/components
import { LayoutModule } from './components/layout/layout.module';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    DashboardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
