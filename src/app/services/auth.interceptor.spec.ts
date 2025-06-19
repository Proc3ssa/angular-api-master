import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: AuthService;
  let http: HttpClient;
  let handler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    handler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return of(null as any);
      }
    };
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header with the token', () => {
    spyOn(authService, 'getToken').and.returnValue('test-token');
    const request = new HttpRequest('GET', '/test');

    interceptor.intercept(request, handler).subscribe(() => {
      expect(request.headers.has('Authorization')).toBe(true);
      expect(request.headers.get('Authorization')).toBe('Bearer test-token');
    });
  });

  it('should not add an Authorization header if the token is not available', () => {
    spyOn(authService, 'getToken').and.returnValue('');
    const request = new HttpRequest('GET', '/test');

    interceptor.intercept(request, handler).subscribe(() => {
      expect(request.headers.has('Authorization')).toBe(false);
    });
  });
});