import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  token = null;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt_token = localStorage.getItem('token');

    if(jwt_token == undefined){
      this.token = ''
    } else {
      this.token = jwt_token;
    }

    if(jwt_token) {
      if(!this.isExpired()){
        req = req.clone({
          setHeaders: {'Authorization': 'Bearer ' + this.token}
        });
      }else {
        req = req.clone({
          setHeaders: {'token': '_prueba'}
        });
      }
    }
    return next.handle(req);
  }

  isExpired(): boolean {
    const jwt_token = localStorage.getItem('token');
    if(jwt_token == undefined){
      this.token = ''
    } else {
      this.token = jwt_token;
    }
    return this.jwtHelper.isTokenExpired(this.token);
  }
}
