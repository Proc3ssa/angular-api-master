import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handle(error: HttpErrorResponse) {
    console.error('API Error:', error);

    if (error.status === 0) {
      return throwError(() => new Error('Network error. Please try again.'));
    }

    if (error.status >= 400 && error.status < 500) {
      return throwError(() => new Error('Client error: ' + (error.error?.message || error.message)));
    }

    if (error.status >= 500) {
      return throwError(() => new Error('Server error. Please try again later.'));
    }

    return throwError(() => new Error('Unexpected error occurred.'));
  }
}
