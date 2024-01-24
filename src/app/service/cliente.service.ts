import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteURL=environment.apiRestURL+'/Cliente';
  constructor(private httpClient:HttpClient) { }

  public list():Observable<Clientes[]>{
    return this.httpClient.get<Clientes[]>(this.clienteURL);
  }

  public detail(id: number):Observable<Clientes>{
    return this.httpClient.get<Clientes>(this.clienteURL + `/${id}`);
  }

  public listByNombreClase(nombreClase: String):Observable<Clientes[]>{
    return this.httpClient.get<Clientes[]>(this.clienteURL+ `/NombreClase/${nombreClase}`);
  }

  public save(cliente:Clientes):Observable<any>{
    return this.httpClient.post<any>(this.clienteURL,cliente);
  }

  public update(id: number,cliente:Clientes):Observable<any>{
    return this.httpClient.put<any>(this.clienteURL+`/${id}`,cliente);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.clienteURL+`/${id}`);
  }
  
}
