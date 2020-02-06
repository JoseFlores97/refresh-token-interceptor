import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { IToken } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.requestCount++;
            if (this.authService.requestCount > 3) {
              this.authService.requestCount = 0;
              return throwError(error);
            }
            return this.unauthorized(req, next, token.refreshToken + 'sd');
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: IToken) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  private unauthorized(
    req: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(token => {
        this.authService.token = token;
        req = this.addToken(req, token);
        return next.handle(req);
      })
    );
  }
}
