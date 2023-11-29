import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Features} from "../shared/models/features";
import {PostsComponent} from "./posts/posts.component";
import {UserStep} from "./models/user-step";
import {LoginComponent} from "./login/login.component";
import {UsersModule} from "./users.module";
import {authGuard} from "../shared/guards/auth.guard";
import {CreatePostComponent} from "../features/posts/create-post/create-post.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: UserStep.LOGIN, pathMatch: "full"},
      {path: UserStep.LOGIN, component: LoginComponent},
      {path: UserStep.REGISTER, component: RegisterComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), UsersModule],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
