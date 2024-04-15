import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ventas } from '../models/producto';
import { Corte } from '../models/corteDiario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  API_URI = environment.apiRestURLPagos;

  constructor(private http: HttpClient) {}

  getVentas() {
    return this.http.get<Ventas[]>(`${this.API_URI}/Pago`);
  }

  getVentaDiario() {
    return this.http.get<Ventas[]>(`${this.API_URI}/PagoDiario`);
  }

  getVentaMensual(mes: any) {
    return this.http.get<Ventas[]>(`${this.API_URI}/PagoMes/${mes}`);
  }

  getVentaAnual(anio: number) {
    return this.http.get<Ventas[]>(`${this.API_URI}/PagoAnio/${anio}`);
  }
  
  saveVentas(ventas: Ventas) {
    return this.http.post(`${this.API_URI}/Pago/`, ventas);
  }

  getCortes() {
    return this.http.get<Corte[]>(`${this.API_URI}/Cortes`);
  }

  getCorteDiario() {
    return this.http.get<Corte[]>(`${this.API_URI}/CorteDiario`);
  }

  postCorteDiario() {
    return this.http.post(`${this.API_URI}/CorteDiarioAdd/`, null);
  }

  getCorteMensual(mes: any) {
    return this.http.get<Corte[]>(`${this.API_URI}/CorteMes/${mes}`);
  }

  getCorteAnual(anio: number) {
    return this.http.get<Corte[]>(`${this.API_URI}/CorteAnio/${anio}`);
  }
}
