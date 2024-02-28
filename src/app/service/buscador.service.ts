import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private searchUrl = 'assets/json/textos_por_modulo.json'; 
  constructor(
    private http: HttpClient
  ) { }

  search(text: string): Observable<any[]> {
    return this.http.get<any[]>(this.searchUrl).pipe(
      map(data => {
        const searchText = text.toLowerCase();
        return data.filter(item => item.data.some((word: string) => word.toLowerCase().includes(searchText)));
      })
    );
  }
  
}
