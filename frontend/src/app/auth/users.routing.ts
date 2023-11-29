import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Features} from "../shared/models/features";
import {PostsComponent} from "./posts/posts.component";
import {UserStep} from "./models/user-step";
import {LoginComponent} from "./login/login.component";
import {UsersModule} from "./users.module";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: UserStep.CATALOG, pathMatch: "full"},
      {path: UserStep.CATALOG, component: PostsComponent},
      {path: UserStep.LOGIN, component: LoginComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), UsersModule],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
