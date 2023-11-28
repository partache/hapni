import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = sessionStorage.getItem('authToken');

    if(authToken){
      let authRequest = request.clone({
        headers: request.headers.set('X-Authorization', `${authToken}`).set('Content-Type', 'application/json')
      })

      return next.handle(authRequest);
    }

    if(request.body){
      const authRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }

}
