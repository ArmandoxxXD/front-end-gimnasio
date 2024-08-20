// Elaboro Juan de Dios, Victor Garay
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ventas } from 'src/app/models/producto';
import { PagosService } from 'src/app/service/pagos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css'],
})
export class ListaVentasComponent implements OnInit {
  ventas: Ventas[] = [];
  ventaSeleccionadaModal: Ventas = {
    productos: [],
    tipoPago: '',
    fecha: new Date(),
    total: 0,
  };

  venta: Ventas = {
    productos: [],
    tipoPago: '',
    fecha: new Date(),
    total: 0,
  };

  filtroActual: string = 'all';
  mes: String = '';
  anio: number = 0;

  constructor(
    private ventaService: PagosService,
    private pagoService: PagosService,
    private toast: ToastrService
    ) {}

  ngOnInit(): void {
    this.getVentas();
  }

  async getVentas() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.ventaService.getVentas().subscribe(
      // Callback en caso de éxito de la petición
      (resp) => {
        // Asigna la respuesta de la petición a la variable 'ventas'
        Swal.close();
        this.ventas = resp;
        this.filtroActual = 'all';
      },
      // Callback en caso de error de la petición, muestra el error en la consola
      (err) => {
        Swal.close();
        console.error(err)
      }
    );
  }

  async mostrarDetalles(index: number) {
    // Asigna el elemento de ventas en la posición 'index' a la variable 'ventaSeleccionadaModal'
    this.ventaSeleccionadaModal = this.ventas[index];
  }

  cambiarPagina() {}


  ventaDiario() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.pagoService.getVentaDiario().subscribe(
      // Callback en caso de éxito de la petición
      (resp) => {
        Swal.close();
        // Asigna la respuesta de la petición a la variable 'cortes'
        this.ventas = resp;
        this.filtroActual = 'today';
      },
      // Callback en caso de error de la petición, muestra el error en la consola
      (err) => {
        Swal.close();
        console.error(err)
      }
    );
  }

  ventaMensual() {
    // Verifica si el valor de 'mes' no es nulo ni vacío
    if (this.mes != null && this.mes != '') {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.pagoService.getVentaMensual(this.mes.toString().slice(-2)).subscribe(
        // Callback en caso de éxito de la petición
        (resp) => {
          Swal.close();
          // Asigna la respuesta de la petición a la variable 'cortes'
          this.ventas = resp;
          this.filtroActual = 'month';
          // Limpia el valor de 'mes'
          this.mes = '';
        },
        // Callback en caso de error de la petición, muestra el error en la consola
        (err) => {
          Swal.close();
          console.error(err)
          }
      );
    } else {
      // Muestra un mensaje de error si 'mes' es nulo o vacío
      this.toast.error('Select a Valid Month', 'Error', { timeOut: 3000 });
    }
  }

  ventaAnual() {
    // Verifica si el valor de 'anio' no es nulo y es mayor o igual a 2020
    if (this.anio != null && this.anio >= 2020) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.pagoService.getVentaAnual(this.anio).subscribe(
        // Callback en caso de éxito de la petición
        (resp) => {
          Swal.close();
          // Asigna la respuesta de la petición a la variable 'cortes'
          this.ventas = resp;
          this.filtroActual = 'year';
          this.anio = 0;
        },
        // Callback en caso de error de la petición, muestra el error en la consola
        (err) => {
          Swal.close();
          console.error(err)
        }
      );
    } else {
      // Muestra un mensaje de error si 'anio' es nulo o menor a 2020
      this.toast.error('Select a Valid Year', 'Error', { timeOut: 3000 });
    }
  }
}
