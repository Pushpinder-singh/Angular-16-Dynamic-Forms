import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistration } from './user-registration';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    UserRegistration
  ],
  providers:[
    UserService
  ]
})
export class UserRegistrationModule { }
