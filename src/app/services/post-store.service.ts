import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  setPosts(posts: Post[]): void {
    this.postsSubject.next(posts);
  }

  addPost(post: Post): void {
    const current = this.postsSubject.getValue();
    this.postsSubject.next([post, ...current]);
  }

  getPostsSnapshot(): Post[] {
    return this.postsSubject.getValue();
  }
}
