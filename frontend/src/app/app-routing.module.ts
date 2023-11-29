import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Features } from './shared/models/features'

const routes: Routes = [
    { path: '', redirectTo: `/${Features.POSTS}`, pathMatch: 'full' },
    {
        loadChildren: () => import('./features/posts/posts.routing').then((m) => m.PostsRoutingModule),
        path: Features.POSTS,
    },
    {
        path: Features.USERS,
        loadChildren: () => import('./auth/users.routing').then((m) => m.UsersRoutingModule),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
