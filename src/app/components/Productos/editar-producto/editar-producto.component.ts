import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditProducto, Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  isAdmin: boolean=false;
  proveedores:Proveedor[]=[];
  id!:number;
  producto!:Producto;
  nombreProducto!: String;
  previewUrl: any = null;
  isPhotoDeleted: boolean = false;
  originalProductData!: Producto;

  constructor(
    private productoService:ProductoService,
    private proveedorService:ProveedorService,
    private toast:ToastrService, 
    private token:TokenService,
    private router:Router, 
    private activateRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getProductos();
    this.getProveedores();
  }

  onUpdate():void{
    const dto=new EditProducto(this.producto.nombreProducto,this.producto.imagen,this.producto.cantidad,this.producto.precio,this.producto.nombreProvedor,this.producto.categoria,this.producto.tipo,this.producto.codeBar,this.isPhotoDeleted);
    this.productoService.update(this.id,dto).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.router.navigate(['/producto/lista'])
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    );
  }

  
  getProveedores():void{
    this.proveedorService.list().subscribe(
      data=>{
        this.proveedores=data;
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

  getProductos(){
    this.id= this.activateRoute.snapshot.params['id'];
    this.productoService.detail(this.id).subscribe(
      data=>{
        this.producto=data;
        this.originalProductData =JSON.parse(JSON.stringify(data));
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/producto/lista'])
      }
    );
  }

  hasChanges(): boolean {
    return JSON.stringify(this.originalProductData) !== JSON.stringify(this.producto);
  }

  onFileChange(event: any): void {
    console.log(this.hasChanges())
    if (event.target.files.length > 0) {
      this.producto.imagen = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
  
      reader.readAsDataURL(this.producto.imagen);
    }
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    if (!this.isPhotoDeleted) {
      this.producto.imagen = this.originalProductData.imagen;
    }
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
  
  deleteImage(): void {
    this.isPhotoDeleted = true;
    this.producto.imagen =  new File([], "");
    this.previewUrl = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }

}
