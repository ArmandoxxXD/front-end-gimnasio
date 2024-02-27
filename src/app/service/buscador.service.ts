import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private searchUrl = 'assets/json/textos_por_modulos.json'; 
  constructor(
    private http: HttpClient
  ) { }

  search(text: string): Observable<any> {
    console.log(text);
    return this.http.get<any>(this.searchUrl).pipe(
      map(data => {
        // Realizar la búsqueda en el JSON y devolver los resultados
        // Aquí implementarías la lógica de búsqueda según tus necesidades
        return Object.keys(data).filter(key => data[key].includes(text));
      })
    );
  }
  
}
