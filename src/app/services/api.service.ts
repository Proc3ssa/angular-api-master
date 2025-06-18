import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { Comment } from '../models/comment';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}


  getPosts(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  getPost(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/posts/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  createPost(post: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/posts`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  updatePost(id: number, post: Partial<Comment>): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/posts/${id}`, post)
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

getPaginatedPosts(page: number, limit: number = 10): Observable<Comment[]> {
  const params = new URLSearchParams({ _page: page.toString(), _limit: limit.toString() });
  return this.http.get<Comment[]>(`${this.baseUrl}/posts?${params.toString()}`)
    .pipe(
      retry(1),
      catchError(error => this.errorHandler.handle(error))
    );
}

}
