import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
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
    this.productoService.update(this.id,this.producto).subscribe(
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
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/producto/lista'])
      }
    );
  }

}
