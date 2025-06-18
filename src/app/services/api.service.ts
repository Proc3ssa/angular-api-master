import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { Comment } from '../models/comment';
import { ErrorService } from './error.service';



export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}


  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred with the API.'));
  }

  getPostComments(postId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.baseUrl}/posts/${postId}/comments`)
    .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
}

getPaginatedPosts(page: number, limit: number = 10): Observable<Post[]> {
  const params = new URLSearchParams({ _page: page.toString(), _limit: limit.toString() });
  return this.http.get<Post[]>(`${this.baseUrl}/posts?${params.toString()}`)
    .pipe(
      retry(1),
      catchError(error => this.errorHandler.handle(error))
    );
}

}
