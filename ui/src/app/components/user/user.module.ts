import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  exports: [
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ]
})
export class UserModule { }
