import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePostComponent} from "./create-post/create-post.component";
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [CreatePostComponent, PostDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
