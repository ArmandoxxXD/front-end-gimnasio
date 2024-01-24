import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private token:TokenService, private route:Router){}

  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean  {
    if(this.token.isLogged()){
      this.route.navigate(['/home'])
      return false;
    }
    return true;
  }
  
}
