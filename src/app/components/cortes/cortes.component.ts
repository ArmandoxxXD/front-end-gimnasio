// Elaboro Victor Garay, Alexis Martinez
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Corte } from 'src/app/models/corteDiario';
import { PagosService } from 'src/app/service/pagos.service';

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.css'],
})
export class CortesComponent implements OnInit {
  cortes: Corte[] = [];

  corte: Corte = {
    totalEfectivo: 0,
    totalPaypal: 0,
    total: 0,
    fecha: new Date(),
  };

  mes: String = '';
  anio: number = 0;

  constructor(
    private pagoService: PagosService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCortes();
  }

  getCortes() {
    this.pagoService.getCortes().subscribe(
      // Callback en caso de éxito de la petición
      (resp) => {
        // Asigna la respuesta de la petición a la variable 'cortes'
        this.cortes = resp;
      },
      // Callback en caso de error de la petición, muestra el error en la consola
      (err) => console.error(err)
    );
  }

  corteDiario() {
    this.pagoService.getCorteDiario().subscribe(
      // Callback en caso de éxito de la petición
      (resp) => {
        // Asigna la respuesta de la petición a la variable 'cortes'
        this.cortes = resp;
      },
      // Callback en caso de error de la petición, muestra el error en la consola
      (err) => console.error(err)
    );
  }

  corteMensual() {
    // Verifica si el valor de 'mes' no es nulo ni vacío
    if (this.mes != null && this.mes != '') {
      this.pagoService.getCorteMensual(this.mes.toString().slice(-2)).subscribe(
        // Callback en caso de éxito de la petición
        (resp) => {
          // Asigna la respuesta de la petición a la variable 'cortes'
          this.cortes = resp;
          // Limpia el valor de 'mes'
          this.mes = '';
        },
        // Callback en caso de error de la petición, muestra el error en la consola
        (err) => console.error(err)
      );
    } else {
      // Muestra un mensaje de error si 'mes' es nulo o vacío
      this.toast.error('Select a Valid Month', 'Error', { timeOut: 3000 });
    }
  }

  corteAnual() {
    // Verifica si el valor de 'anio' no es nulo y es mayor o igual a 2020
    if (this.anio != null && this.anio >= 2020) {
      this.pagoService.getCorteAnual(this.anio).subscribe(
        // Callback en caso de éxito de la petición
        (resp) => {
          // Asigna la respuesta de la petición a la variable 'cortes'
          this.cortes = resp;
          this.anio = 0;
        },
        // Callback en caso de error de la petición, muestra el error en la consola
        (err) => console.error(err)
      );
    } else {
      // Muestra un mensaje de error si 'anio' es nulo o menor a 2020
      this.toast.error('Select a Valid Year', 'Error', { timeOut: 3000 });
    }
  }
}
