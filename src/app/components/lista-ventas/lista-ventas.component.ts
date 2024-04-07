// Elaboro Juan de Dios, Victor Garay
import { Component, OnInit } from '@angular/core';
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

  constructor(private ventaService: PagosService) {}

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
}
