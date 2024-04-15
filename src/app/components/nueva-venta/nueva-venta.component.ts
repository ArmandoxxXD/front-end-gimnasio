import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import {
  ProductoVenta,
  ProductoVentaData,
  Ventas,
} from 'src/app/models/producto';
import { PagosService } from 'src/app/service/pagos.service';
import { ProductosService } from 'src/app/service/productos.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
})
export class NuevaVentaComponent implements OnInit {
  productos: ProductoVentaData[] =this.productoService.productos;
  productosVenta: ProductoVenta[] = this.productoService.productosVenta;
  tipoPago: string = 'Payment Type';
  codeBar: string = this.productoService.codeBar;
  cantidad: number = this.productoService.cantidad;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isRecepcionista: boolean = false;
  productoSeleccionadoModal: ProductoVentaData = {
    nombre: '',
    cantidad: 0,
    codeBar: '',
    img: '',
    total: 0,
  };
  productoSeleccionado: ProductoVenta = {
    nombre: '',
    cantidad: 0,
  };

  constructor(
    private ventaService: PagosService,
    private productoService: ProductosService,
    private toast: ToastrService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.isUser = this.token.isUser();
    this.isRecepcionista = this.token.isRecepcionista();
  }
  // Guarda una venta
  saveVentas() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    // Verifica si el tipo de pago es 'Payment Type'
    if (this.tipoPago == 'Payment Type') {
      // Muestra un mensaje de error utilizando una librería de notificaciones llamada 'toast'
      this.toast.error('Select Payment Type', 'Error', { timeOut: 3000 });
      // Verifica si no se han agregado productos a la venta
    } else if (!this.productosVenta.length) {
      // Muestra un mensaje de error utilizando la librería de notificaciones 'toast'
      this.toast.error('No Products Added', 'Error', { timeOut: 3000 });
    } else {
      // Crea un objeto 'ventas' con los datos de la venta
      const ventas: Ventas = {
        tipoPago: this.tipoPago,
        productos: this.productosVenta,
        fecha: new Date(),
        total: 0,
      };
      // Realiza una llamada al servicio de venta para guardar la venta
      this.ventaService.saveVentas(ventas).subscribe(
        (resp) => {
          // Realiza una llamada adicional al servicio de venta para crear un corte diario
          this.ventaService.postCorteDiario().subscribe((resp) => {
            // Muestra un mensaje de éxito utilizando la librería de notificaciones 'toast'
            this.toast.success('Sale Success', 'OK', { timeOut: 3000 });
            Swal.close();
          });
            this.productos.splice(0,this.productos.length);
            this.productosVenta.splice(0,this.productosVenta.length);
            const userName = this.token.getDatesUserName();
            localStorage.setItem(userName+'.productos', JSON.stringify(this.productos));
            localStorage.setItem(userName+'.productosVentas', JSON.stringify(this.productosVenta));
            this.productoService.cargarCarrito();
        },
        (err) => {
          Swal.close();
          console.error(err)
        }
      );
    }
  }

  /**
   * Muestra los detalles de un producto seleccionado en un modal.
   * @param index - El índice del producto seleccionado en la lista de productos.
   */
  mostrarDetalles(index: number) {
    // Obtiene el producto seleccionado en base al índice proporcionado
    const productoSeleccionado = this.productos[index];
    // Asigna el producto seleccionado a una variable llamada 'productoSeleccionadoModal'
    this.productoSeleccionadoModal = productoSeleccionado;
  }

  /**
   * Remueve un producto del arreglo de productos en base a su índice.
   * @param index - El índice del producto a ser removido en el arreglo de productos.
   */
  removerProducto(index: number) {
    // Utiliza el método 'splice' para eliminar un elemento del arreglo en base a su índice
    // El segundo argumento '1' indica que se eliminará solo un elemento
    this.productos.splice(index, 1);
    const userName = this.token.getDatesUserName();
    localStorage.setItem(userName+'.productos', JSON.stringify(this.productos));
    this.productoService.cargarCarrito();
  }

  payPalConfig: IPayPalConfig = {
    clientId:
      'ATk6rT2zsBdbXvKX_0EtlTh9zoWJ-Feb_pXNDs9lU3BKj1UHd41XFjhaLVk8SE1iE7zBGRdN4DzeQbOR',
    currency: 'MXN',
    createOrderOnClient: (data) =>
      <ICreateOrderRequest>{
        intent: 'CAPTURE', // Establece la intención de la orden como 'CAPTURE', lo que significa que el pago será capturado inmediatamente
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: this.getTotal().toString(), // Establece el valor total de la orden
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: this.getTotal().toString(), // Establece el valor total de los items de la orden
                },
              },
            },
            items: [
              {
                name: 'GYMONGO',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: this.getTotal().toString(),
                },
              },
            ],
          },
        ],
      },
    advanced: {
      commit: 'true', // Habilita la opción de captura automática del pago
    },
    style: {
      label: 'pay', // Establece el texto del botón de pago
      layout: 'vertical', // Establece el diseño del botón de pago
    },
    onApprove: (data, actions) => {
      // Función que se ejecutará cuando el usuario apruebe el pago
      // Realiza la captura del pago y ejecuta otras acciones, como guardar ventas y recargar la página
      return actions.order.capture().then((details: any) => {
        this.saveVentas();
        this.ventaService.postCorteDiario().subscribe((resp) => {
          window.location.reload();
        });
      });
    },
    onCancel: (data, actions) => {
      // Función que se ejecutará cuando el usuario cancele el pago
      // Muestra un mensaje de cancelación al usuario
      this.toast.info('Transaction Canceled', 'Canceled', { timeOut: 3000 });
    },
    onError: (err) => {
      // Función que se ejecutará cuando ocurra un error en el proceso de pago
      // Muestra un mensaje de error al usuario
      this.toast.error('Check the sale data', 'Error', { timeOut: 3000 });
    },
  };

  getTotal() {
    let total: number = 0; // Inicializa una variable para almacenar el valor total
    this.productos.forEach((item) => {
      total += item.total.valueOf(); // Suma el valor total de cada item al valor total acumulado
    });
    return total.toFixed(2); // Devuelve el valor total formateado como una cadena con dos decimales
  }

  validarNumero() {
    // Comprueba si el valor de la variable 'cantidad' es mayor a cero
    if (this.cantidad > 0) {
      // Muestra un mensaje de éxito si es verdadero
      this.toast.success('Product Added', 'OK', { timeOut: 3000 });
    } else {
      // Muestra un mensaje de error si es falso
      this.toast.error('Enter a Valid Amount', 'Error', { timeOut: 3000 });
    }
  }
}
