import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Producto, ProductoVenta, ProductoVentaData } from '../models/producto';
import { Categoria } from '../models/categorias';
import { environment } from 'src/environments/environment';
import { PagosService } from './pagos.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  API_URI = environment.apiRestURLPagos;

  productos: ProductoVentaData[] = [];
  productosVenta: ProductoVenta[] = [];
  codeBar: string = '';
  cantidad: number = 1;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private token: TokenService
    ) {
    this.cargarCarrito()
    }

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

  
  /**
   * Agrega un producto a dos arreglos diferentes en base a la cantidad y disponibilidad del producto.
   * @param producto - El código de barras o identificador del producto a ser agregado.
   */
  agregarProducto(producto: string) {
    // Crear objetos vacíos para el producto y la venta
    const product: ProductoVentaData = {
      nombre: '',
      cantidad: 0,
      codeBar: '',
      img: '',
      total: 0,
    };
    const venta: ProductoVenta = {
      nombre: '',
      cantidad: 0,
    };
    // Verificar que la cantidad sea mayor a 0
    if (this.cantidad > 0) {
      // Llamar al servicio para obtener los datos del producto
      this.getProduct(producto)
        .pipe(
          // Utilizar el operador 'tap' para manejar errores y mostrar mensajes
          tap((data) => {
            if (!data || data instanceof HttpErrorResponse) {
              this.toast.error('Product Not Found', 'Error', { timeOut: 3000 });
              this.codeBar = '';
              this.cantidad = 1;
            }
          })
        )
        .subscribe((data) => {
          // Verificar que la cantidad del producto sea mayor a la cantidad deseada
          if (data.cantidad > this.cantidad - 1) {
            // Verificar que el producto no exista ya en el arreglo 'this.productos'
            if (!this.productos.find((item) => item.codeBar === data.codeBar)) {
              // Calcular el total del producto en base a la cantidad y precio
              product.total = this.cantidad * data.precio;
              product.cantidad = this.cantidad;
              product.codeBar = data.codeBar;
              product.img = data.imagen.toString();
              product.nombre = data.nombreProducto;
              venta.nombre = data.nombreProducto;
              venta.cantidad = this.cantidad;
              // Agregar el producto y la venta a los arreglos correspondientes

              this.productos.push(product);
              this.productosVenta.push(venta);
              const userName = this.token.getDatesUserName();
              localStorage.setItem(userName+'.productos', JSON.stringify(this.productos));
              localStorage.setItem(userName+'.productosVentas', JSON.stringify(this.productosVenta));

              this.toast.success('Product added to shopping cart', 'OK', { timeOut: 3000 });
              this.codeBar = '';
              this.cantidad = 1;
            } else {
              // Actualizar la cantidad y total del producto y venta si el producto ya existe en el arreglo
              const product: any = this.productos.find(
                (item: ProductoVentaData) => {
                  return item.nombre == data.nombreProducto;
                }
              );
              const productVenta: any = this.productosVenta.find(
                (item: ProductoVenta) => {
                  return item.nombre == data.nombreProducto;
                }
              );

              const index = this.productos.indexOf(product);
              const indexVenta = this.productosVenta.indexOf(productVenta);
              let cantidadPrevia = this.productos[index].cantidad;
              cantidadPrevia += this.cantidad;
              
              if (data.cantidad < cantidadPrevia ){
                this.toast.error('No inventory', 'Error', { timeOut: 3000 });
              } else {
                this.productos[index].cantidad += this.cantidad;
                this.productos[index].total = this.productos[index].cantidad * data.precio;
                this.productosVenta[indexVenta].cantidad += this.cantidad;

                const userName = this.token.getDatesUserName();
                localStorage.setItem(userName+'.productos', JSON.stringify(this.productos));
                localStorage.setItem(userName+'.productosVentas', JSON.stringify(this.productosVenta));

                this.toast.success('Product added to shopping cart', 'OK', { timeOut: 3000 });
                this.codeBar = '';
                this.cantidad = 1;
              }
            }
          } else {
            // Mostrar mensaje de error si no hay suficiente inventario
            this.toast.error('No inventory', 'Error', { timeOut: 3000 });
            this.codeBar = '';
            this.cantidad = 1;
          }
        });
    } else {
      // Mostrar mensaje de error si la cantidad no es válida
      this.toast.error('Insert a Valid Number', 'Error', { timeOut: 3000 });
      this.codeBar = '';
      this.cantidad = 1;
    }
  }

  cargarCarrito() {
    const userName = this.token.getDatesUserName();
      const productosEnCarrito = localStorage.getItem(userName+'.productos');
      const cantidad = localStorage.getItem(userName+'.productosVentas');
      if(productosEnCarrito && cantidad){
        this.productos= JSON.parse(productosEnCarrito);
        this.productosVenta =  JSON.parse(cantidad);
      }
  }
}
