import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from "./create-post/create-post.component";
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostItemComponent} from "./post-item/post-item.component";
import {PostsComponent} from "./posts/posts.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [CreatePostComponent, PostsComponent, PostDetailsComponent, PostItemComponent, CreatePostComponent],
    exports: [
        PostItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class PostsModule {
}
