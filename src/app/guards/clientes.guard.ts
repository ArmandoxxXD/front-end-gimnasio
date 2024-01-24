import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesGuard implements CanActivate {
  realRol!:string;

  constructor(private token:TokenService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean  {
    const expectedRoles= route.data['expectedRoles'];
    this.realRol= this.token.isAdmin() ? 'admin': 'user','instructor','mantenimeinto','recepcionista';
    if(this.token.getToken==null){
      this.router.navigate(['/login'])
    } else if(expectedRoles.indexOf(this.realRol)<0){
      this.router.navigate(['/home'])
    }
    return true;
  }
  
}
