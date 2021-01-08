import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {
  }

  /**
   * @param request The outgoing request to handle
   * @param next The next interceptor in the chain, or the backend if no interceptors in the chain.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.player) {
      request = request.clone({
        setHeaders: {
          player: localStorage.player,
        },
      });
    }
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    return next.handle(request).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      if (error.error?.message) {
        alert(`🥴 ${error.error.message}`);
      } else {
        let alertText: string;
        switch (error.status) {
          case 400: {
            alertText = 'Seems like you requested something that you shouldn\'t have.';
            break;
          }
          case 401: {
            localStorage.clear();
            this.router.navigateByUrl('/home/register');
            alertText = 'Seems like your authentication has expired. Join again.';
            break;
          }
          case 404: {
            alertText = 'Can\'t find what you\'re looking for here.';
            break;
          }
          case 500: {
            alertText = 'Seems like our server';
            break;
          }
          default: {
            alertText = 'How did you catch it?';
          }
        }
        if (alertText) {
          alert(`😲 Error ${error.statusText}\n${alertText}`);
        }
      }
      return throwError(error);
    }));
  }
}
