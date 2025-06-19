import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { ErrorService } from './error.service';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl;
  let errorHandler: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, ErrorService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    errorHandler = TestBed.inject(ErrorService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    const mockPosts: Post[] = [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }];
    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });
    const req = httpMock.expectOne(`${baseUrl}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should get a post', () => {
    const mockPost: Comment = { id: 1, name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 };
    service.getPost(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });
    const req = httpMock.expectOne(`${baseUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a post', () => {
    const mockPost: Partial<Comment> = { name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 };
    const mockResponse: Comment = { id: 2, name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 };
    service.createPost(mockPost).subscribe(post => {
      expect(post).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPost);
    req.flush(mockResponse);
  });

  it('should update a post', () => {
    const mockPost: Partial<Comment> = { name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 };
    const mockResponse: Comment = { id: 1, name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 };
    service.updatePost(1, mockPost).subscribe(post => {
      expect(post).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/posts/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockPost);
    req.flush(mockResponse);
  });

  it('should delete a post', () => {
    service.deletePost(1).subscribe(() => {});
    const req = httpMock.expectOne(`${baseUrl}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get post comments', () => {
    const mockComments: Comment[] = [{ id: 1, name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 }];
    service.getPostComments(1).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });
    const req = httpMock.expectOne(`${baseUrl}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should get paginated posts', () => {
    const mockComments: Comment[] = [{ id: 1, name: 'Test Post', email: 'test@test.com', body: 'Test Body', postId: 1 }];
    const page = 1;
    const limit = 10;
    service.getPaginatedPosts(page, limit).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });
    const req = httpMock.expectOne(`${baseUrl}/posts?_page=${page}&_limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should handle error when getting posts', () => {
    const mockError = new Error('Test error');
    spyOn(errorHandler, 'handle').and.returnValue(throwError(() => mockError));

    service.getPosts().subscribe({
      next: () => fail('Expected an error, not posts'),
      error: (error) => {
        expect(errorHandler.handle).toHaveBeenCalled();
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/comments`);
    req.error(new ErrorEvent('network error'));
  });
});
