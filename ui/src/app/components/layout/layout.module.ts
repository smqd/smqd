import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule
  ],
  declarations: [
    NavigationComponent,
    TopnavbarComponent,
    FooterComponent,
    BasicLayoutComponent
  ],
  exports: [
    BasicLayoutComponent,
    NavigationComponent,
    FooterComponent,
    TopnavbarComponent
  ]
})
export class LayoutModule { }
