import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { authGuard } from '../../shared/guards/auth.guard'
import { PostsStep } from '../models/posts-step'
import { CreatePostComponent } from './create-post/create-post.component'
import { PostDetailsComponent } from './post-details/post-details.component'
import { PostsModule } from './posts.module'
import { PostsComponent } from './posts/posts.component'

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: PostsStep.CATALOG, pathMatch: 'full' },
            { path: PostsStep.CATALOG, component: PostsComponent },
            { path: PostsStep.POST_CREATE, component: CreatePostComponent, canActivate: [authGuard] },
            { path: PostsStep.POST_DETAILS, component: PostDetailsComponent },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes), PostsModule],
    exports: [RouterModule],
})
export class PostsRoutingModule {}
