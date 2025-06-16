import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
      .pipe(catchError(error => this.handleError(error)));
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post)
      .pipe(catchError(error => this.handleError(error)));
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post)
      .pipe(catchError(error => this.handleError(error)));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred with the API.'));
  }
}
