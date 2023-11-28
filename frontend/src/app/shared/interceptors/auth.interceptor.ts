import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {User} from "../models/User";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
          const newlyLoggedUser: User = event.body as User;
          this.authService.handleLogin(newlyLoggedUser);
        } else if (event.url?.endsWith('logout')) {
          this.authService.handleLogout();
        }
      }
    }));
  }
}
