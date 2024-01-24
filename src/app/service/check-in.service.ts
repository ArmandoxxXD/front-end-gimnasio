import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckIn } from '../models/check-in';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  checkInURL=environment.apiRestURL+ '/check-in';

  constructor(private http:HttpClient) { }

  public list():Observable<CheckIn[]>{
    return this.http.get<CheckIn[]>(this.checkInURL);
  }

  public listCheckInForIdEmpleado(idEmpelado:number):Observable<CheckIn[]>{
    return this.http.get<CheckIn[]>(this.checkInURL+`/IdEmpleado/${idEmpelado}`)
  }

  public reviewCheckIn(idEmpleado: number, fecha:string):Observable<CheckIn[]>{
    return this.http.get<CheckIn[]>(`${this.checkInURL}/IdEmpleado/${idEmpleado}/fecha/${fecha}`);
  }

  public detail(id:number):Observable<CheckIn>{
    return this.http.get<CheckIn>(this.checkInURL+`/${id}`);
  }

  public create(check:CheckIn):Observable<any>{
    return this.http.post<any>(this.checkInURL,check)
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.checkInURL+`/${id}`);
  }

  /*
  reviewCheckIn(idEmpleado, fecha) {
    return this.http.get(this.URL + '/checkin/reviewChecks/' + idEmpleado + '/' + fecha);
  }*/

}
