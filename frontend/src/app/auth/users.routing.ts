import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserStep} from "./models/user-step";
import {LoginComponent} from "./login/login.component";
import {UsersModule} from "./users.module";
import {RegisterComponent} from "./register/register.component";
import {guestGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: UserStep.LOGIN, pathMatch: "full"},
      {path: UserStep.LOGIN, component: LoginComponent},
      {path: UserStep.REGISTER, component: RegisterComponent, canActivate: [guestGuard]},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), UsersModule],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
