import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  private cache = new Map<number, { data: Comment[], timestamp: number }>();
  private postsSubject = new BehaviorSubject<Comment[]>([]);
  posts$ = this.postsSubject.asObservable();

  setPosts(posts: Comment[]): void {
    this.postsSubject.next(posts);
  }

  getPostsSnapshot(): Comment[] {
    return this.postsSubject.getValue();
  }

  addPost(post: Comment): void {
  const current = this.postsSubject.getValue();
  this.postsSubject.next([post, ...current]);
}


  // Caching logic
  saveToCache(page: number, posts: Comment[]): void {
    this.cache.set(page, { data: posts, timestamp: Date.now() });
  }

  getFromCache(page: number): Comment[] | null {
    const entry = this.cache.get(page);
    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    if (age < 60_000) { // 1 minute cache
      return entry.data;
    }

    this.cache.delete(page); // expire
    return null;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
