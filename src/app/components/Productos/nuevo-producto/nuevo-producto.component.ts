import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
})
export class NuevoProductoComponent implements OnInit {
  isAdmin: boolean = false;

  nombreProducto!: string;
  imagen: File = new File([], "");
  cantidad!: number;
  precio!: number;
  nombreProvedor!: string;
  categoria!: string;
  tipo!: string;
  codeBar!: string;
  previewUrl: any = null;

  proveedores: Proveedor[] = [];

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private toast: ToastrService,
    private token: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProveedores();
    this.isAdmin = this.token.isAdmin();
  }

  getProveedores(): void {
    this.proveedorService.list().subscribe(
      (data) => {
        this.proveedores = data;
      },
      (err) => {
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  onCreate(): void {
    const proveedor = new Producto(
      this.nombreProducto,
      this.imagen,
      this.cantidad,
      this.precio,
      this.nombreProvedor,
      this.categoria,
      this.tipo,
      this.codeBar
    );
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.productoService.create(proveedor).subscribe(
      (data) => {
        Swal.close();
        this.toast.success(data.mensaje, 'OK', { timeOut: 3000 });
        this.router.navigate(['/producto/lista']);
      },
      (err) => {
        Swal.close();
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };

    reader.readAsDataURL(this.imagen!);
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    this.imagen = new File([], "");
    const fileInput = document.getElementById('imagen') as HTMLInputElement;
    fileInput.value = "";
  }
}
