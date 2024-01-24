import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  aux!:[];
  productos:Producto[]=[];
  producto:Producto|undefined;
  proveedor!:Proveedor|undefined;
  isAdmin: boolean=false;
  filterProductos='';
  showModal = false;
  selectedImage!:String;
  selectedNombre!:String;
  Mapa!:any;
 
  constructor(
  private proveedorService:ProveedorService,
  private productoService:ProductoService,
  private toast:ToastrService, 
  private token:TokenService,
  private router:Router, 
  private sanitizer: DomSanitizer,
  private activateRoute:ActivatedRoute){ 
    document.body.style.height="100vh"
   }

  ngOnInit(): void {
    $('#loading').css('display', 'block');
    this.isAdmin = this.token.isAdmin();
    this.getData();
  }

  getData(){
    const id= this.activateRoute.snapshot.params['id'];
    const nombreProvedor=this.activateRoute.snapshot.params['nombreProvedor'];
    this.verMapa(nombreProvedor);
    this.proveedorService.detailProvedorProducts(id,nombreProvedor).subscribe(
      data=>{
        this.aux=data;
        this.proveedor=this.aux.shift();
        this.productos=this.aux;
        $('#loading').css('display', 'none');
        for(var i=0;i<this.productos.length;i++){
          this.stock(this.productos[i].id);
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        $('#loading').css('display', 'none');
        this.router.navigate(['/proveedor/lista'])
      }
    )
  }

  stock(id:number){
    this.productoService.detail(id).subscribe(
      data=>{
        this.producto=data;
        if(this.producto.existencia==true && this.producto.porAgotarse==false){
          $('#stock' + id).css('background-color', '#9FE49A');
        }else if(this.producto.existencia==true && this.producto.porAgotarse==true){
          $('#stock' + id).css('background-color', '#F7BE93');
        }else if(this.producto.existencia==false){
          $('#stock' + id).css('background-color', '#EC6F6F');
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
}

showImage(image:String,nombre:String) {
  this.selectedImage = image;
  this.selectedNombre=nombre;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedImage = "";
}

reload(){
  for(var i=0;i<this.productos.length;i++){
    this.stock(this.productos[i].id);
  }
}

verMapa(nombreProveedor:String){
    var mapaURl=`https://www.google.com/maps/embed/v1/place?key=AIzaSyCxCYI8Kw39IVk2vtZ9emzXn0RDzZgxssY&q=${nombreProveedor}`;
    this.Mapa=this.sanitizer.bypassSecurityTrustResourceUrl(mapaURl);
}



}
