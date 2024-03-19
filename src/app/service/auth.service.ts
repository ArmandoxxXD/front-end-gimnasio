import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/jwt-token';
import { environment } from 'src/environments/environment';
import { CreateUser, EditPassword, EditUser } from '../models/users';
import { CreateCliente } from '../models/clientes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getFileSize(photoUrl: string) {
    throw new Error('Method not implemented.');
  }

  authURL= environment.apiRestURL+ '/auth';

  constructor(private http:HttpClient) { }

  public login(dto:LoginUser): Observable<JwtToken>{
    return this.http.post<JwtToken>(this.authURL+'/login',dto);
  }

  public register(dto:CreateUser): Observable<any>{
    return this.http.post<any>(this.authURL+'/create',dto.toFormData());
  }

  public registerCliente(dto:CreateCliente): Observable<any>{
    return this.http.post<any>(this.authURL+'/create',dto);
  } 

  public list():Observable<CreateUser[]>{
    return this.http.get<CreateUser[]>(this.authURL);
  }

  public listByRol(rol:String):Observable<CreateUser[]>{
    return this.http.get<CreateUser[]>(this.authURL+`/Rol/${rol}`);
  }

  public detail(id:number):Observable<CreateUser>{
    return this.http.get<CreateUser>(this.authURL+`/${id}`);
  }

  public update(id:number,dto:EditUser):Observable<any>{
    return this.http.put<any>(this.authURL+`/${id}`, dto.toFormData())
  }

  public updatePassword(id:number,dto:EditPassword):Observable<any>{
    return this.http.put<any>(this.authURL+`/change-password/${id}`,dto)
  }


  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.authURL+`/${id}`);
  }

}
