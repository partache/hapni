import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../models/post";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
    posts: Post[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }

}
