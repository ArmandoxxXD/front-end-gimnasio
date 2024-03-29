import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/jwt-token';
import { environment } from 'src/environments/environment';
import { User, EditPassword, EditUser } from '../models/users';
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

  public register(dto:User): Observable<any>{
    return this.http.post<any>(this.authURL+'/create',dto.toFormData());
  }

  public registerCliente(dto:CreateCliente): Observable<any>{
    return this.http.post<any>(this.authURL+'/create',dto.toFormData());
  } 

  public list():Observable<User[]>{
    return this.http.get<User[]>(this.authURL);
  }

  public listByRol(rol:String):Observable<User[]>{
    return this.http.get<User[]>(this.authURL+`/Rol/${rol}`);
  }

  public detail(id:number):Observable<User>{
    return this.http.get<User>(this.authURL+`/${id}`);
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
