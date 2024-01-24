import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  proveedorURL= environment.apiRestURL + '/Producto';
  constructor(private http:HttpClient) { }

  public list():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.proveedorURL);
  }

  public listProvedor(nombreProvedor:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.proveedorURL+`/Provedor/${nombreProvedor}`)
  }

  public listCategorias(categoria:String):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.proveedorURL+`/Categoria/${categoria}`)
  }

  public detail(id:number):Observable<Producto>{
    return this.http.get<Producto>(this.proveedorURL+`/${id}`);
  }

  public create(proveedor:Producto):Observable<any>{
    return this.http.post<any>(this.proveedorURL,proveedor)
  }

  public update(id:number,proveedor:Producto):Observable<any>{
    return this.http.put<any>(this.proveedorURL+`/${id}`,proveedor)
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.proveedorURL+`/${id}`);
  }



}
