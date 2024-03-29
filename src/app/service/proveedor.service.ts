import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditProveedor, Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedorURL= environment.apiRestURL + '/Proveedor';
  constructor(private http:HttpClient) { }

  public list():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.proveedorURL);
  }

  public detail(id:number):Observable<Proveedor>{
    return this.http.get<Proveedor>(this.proveedorURL+`/${id}`);
  }

  public detailProvedorProducts(id:number,nombreProvedor:string):Observable<any>{
    return this.http.get<any>(this.proveedorURL+`/${id}`+`/${nombreProvedor}`);
  }

  public create(proveedor:Proveedor):Observable<any>{
    return this.http.post<any>(this.proveedorURL,proveedor.toFormData())
  }

  public update(id:number,proveedor:EditProveedor):Observable<any>{
    return this.http.put<any>(this.proveedorURL+`/${id}`,proveedor.toFormData())
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.proveedorURL+`/${id}`);
  }
}
