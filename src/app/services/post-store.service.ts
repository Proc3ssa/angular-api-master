import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  private cache = new Map<number, { data: Post[], timestamp: number }>();
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  setPosts(posts: Post[]): void {
    this.postsSubject.next(posts);
  }

  getPostsSnapshot(): Post[] {
    return this.postsSubject.getValue();
  }

  // Caching logic
  saveToCache(page: number, posts: Post[]): void {
    this.cache.set(page, { data: posts, timestamp: Date.now() });
  }

  getFromCache(page: number): Post[] | null {
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
