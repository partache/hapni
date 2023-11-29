import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Features} from "./shared/models/features";

const routes: Routes = [
  {path: '', redirectTo: `/${Features.USERS}`, pathMatch: "full"},
  {
    path: Features.USERS,
    loadChildren: () => import('./auth/users.routing').then((m) => m.UsersRoutingModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
