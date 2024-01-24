import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categorias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  API_URI = environment.apiRestURLPagos;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Producto[]>(`${this.API_URI}/Products`);
  }

  getProduct(codeBar: string) {
    return this.http.get<Producto>(`${this.API_URI}/Products/${codeBar}`);
  }

  saveProduct(producto: Producto) {
    return this.http.post(`${this.API_URI}/Products`, producto);
  }

  updateProduct(name: String, productUpdated: any) {
    return this.http.put(`${this.API_URI}/Products/${name}`, productUpdated);
  }

  deleteProduct(nombre: String) {
    return this.http.delete(`${this.API_URI}/Products/${nombre}`);
  }

  getProductByName(nombre: string) {
    return this.http.get<Producto[]>(
      `${this.API_URI}/Products/searchName/${nombre}`
    );
  }

  getProductByCategory(category: String) {
    return this.http.get<Producto[]>(
      `${this.API_URI}/Products/searchType/${category}`
    );
  }
}
