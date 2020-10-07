import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { GlobalVar } from './global-var';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private gv : GlobalVar, private auth : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Anonymous') != undefined ) {
      const newHeaders = request.headers.delete('Anonymous')
      request = request.clone({headers : newHeaders})
      return next.handle(request)
    }
    if (this.gv.token === null || this.gv.token === undefined ) {
      return from(this.auth.GetToken()).pipe(
        switchMap(token => this.UpdateToken(request, next, token))
      )
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.gv.token}`,
        'Content-type': 'application/json'
      }
    });
    return next.handle(request);
  }
  UpdateToken(request: HttpRequest<unknown>, next: HttpHandler, token): Observable<HttpEvent<unknown>> {
    this.gv.token = token
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
