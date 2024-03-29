import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clase, EditClase } from '../models/clase';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  claseURL = environment.apiRestURL + '/Clase';
  constructor(private http: HttpClient) {}

  public list(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.claseURL);
  }

  public detail(id: number): Observable<Clase> {
    return this.http.get<Clase>(this.claseURL + `/${id}`);
  }

  public obtenerClase(id: string): Observable<any> {
    return this.http.get(this.claseURL + id);
  }

  public create(clase: Clase): Observable<any> {
    return this.http.post<any>(this.claseURL, clase.toFormData());
  }

  public update(id: number, clase: EditClase): Observable<any> {
    return this.http.put<any>(this.claseURL + `/${id}`, clase.toFormData());
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.claseURL + `/${id}`);
  }
}
