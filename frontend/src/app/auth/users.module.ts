import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { RegisterComponent } from './register/register.component';
import { CreatePostComponent } from '../features/posts/create-post/create-post.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
