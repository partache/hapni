import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "./models/post";
import {HttpClient} from "@angular/common/http";
import {apiUrlFeature} from "../../shared/util/api-url";
import {Features} from "../../shared/models/features";
import {User} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = apiUrlFeature(Features.POSTS);
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl('all'));
  }
  createPost(postData: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl('create'), postData);
  }
}
