import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class ClientesInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let intReq= request;
    const token =this.tokenService.getToken();
    if(token != null){
      intReq= request.clone({headers:request.headers.set("Authorization","Bearer "+token)})
    }
    return next.handle(intReq);
  }
}
