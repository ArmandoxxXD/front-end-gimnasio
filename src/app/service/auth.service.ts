import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/jwt-token';
import { environment } from 'src/environments/environment';
import { User, EditPassword, EditUser, ConfigUser, ResetPassword } from '../models/users';
import { CreateCliente } from '../models/clientes';
import { NotificationPush } from '../models/notificationPush';


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

  public detail(id:number|null):Observable<User>{
    return this.http.get<User>(this.authURL+`/${id}`);
  }

  public update(id:number,dto:EditUser):Observable<any>{
    return this.http.put<any>(this.authURL+`/${id}`, dto.toFormData())
  }

  public updatePassword(id:number,dto:EditPassword):Observable<any>{
    return this.http.put<any>(this.authURL+`/change-password/${id}`,dto)
  }

  public resentPassword(id:number,dto:ResetPassword):Observable<any>{
    console.log(id,dto)
    return this.http.put<any>(this.authURL+`/resent-change-password/${id}`,dto)
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.authURL+`/${id}`);
  }

  public configUser(id:number|null,dto:ConfigUser): Observable<any>{
    return this.http.put<any>(this.authURL+`/preferences/${id}`,dto);
  } 

  public pushNotifications(id:number|null,dto:NotificationPush):Observable<any>{
    return this.http.post<any>(this.authURL+`/send/${id}`, dto)
  }

  public validatedCount(token: string):Observable<any>{
    return this.http.get<any>(this.authURL+`/verify-email`,{
      params: { token: token }
      });
  }

  public validatedPasswordReset(token: string):Observable<any>{
    return this.http.get<any>(this.authURL+`/request-password-reset`,{
      params: { token: token }
      });
  }

  verifyTwoFactorCode(userId: number, code: string): Observable<any> {
    return this.http.post(`${this.authURL}/verify-2fa/${userId}`, { code });
  }
  
  resendTwoFactorCode(userId: number): Observable<any> {
    return this.http.get(`${this.authURL}/resend-2fa-code/${userId}`);
  }

  sendTokenPasswordReset(identificator: String): Observable<any> {
    return this.http.get(`${this.authURL}/send-token-password-reset/${identificator}`);
  }
}
