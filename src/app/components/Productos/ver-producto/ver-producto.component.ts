import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  productos:Producto[]=[];
  categorias:String[]=[];
  producto:Producto|undefined;
  isAdmin:boolean=false;
  isUser:boolean=false;
  filterProductos='';
  showModal = false;
  selectedImage!:String;
  selectedNombre!:String;
  selectedcodeBar!:String;

  constructor(
    private productoService:ProductoService,
    private toast:ToastrService,
    private token:TokenService,
    private prodtcutosService:ProductosService
    ) { }

  ngOnInit(): void {
    this.getProductos();
    this.isAdmin = this.token.isAdmin();
    this.isUser = this.token.isUser();
  }

  getProductos():void{
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.productoService.list().subscribe(
      data=>{
        this.productos=data;
        Swal.close();
        this.categorias=this.productos.map(objeto=> objeto.categoria).filter((value,index,self)=> self.indexOf(value)===index);
        for(var i=0;i<this.productos.length;i++){
          this.stock(this.productos[i].id);
        }
      },
      err=>{
        Swal.close();
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }
  onDelete(id:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to remove the action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
        if(result.value){
          this.productoService.delete(id).subscribe(
            data=>{
              this.toast.success(data.mensaje,'OK',{timeOut:3000});
              this.getProductos();
            },
            err=>{
              this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
            }
          );
        }else if(result.dismiss===Swal.DismissReason.cancel){
          Swal.fire(
            'Cancelled',
            'Product not eliminated',
            'error'
          )
        }
      })
  }

  stock(id:number){
      this.productoService.detail(id).subscribe(
        data=>{
          this.producto=data;
          if(this.producto.cantidad >= 10){
            $('#stock' + id).css('background-color', '#9FE49A');
          }else if(this.producto.cantidad < 10 && this.producto.cantidad > 1){
            $('#stock' + id).css('background-color', '#F7BE93');
          }else if(this.producto.cantidad <= 0){
            $('#stock' + id).css('background-color', '#EC6F6F');
          }
        },
        err=>{
          this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        }
      )
  }

  Ninguno(){
    $('#filtrar').html('Filter by...');
    this.getProductos()
  }

  filtrarCategorias(categoria: String){
    $('#filtrar').html('Filter by '+categoria);
    this.productoService.listCategorias(categoria).subscribe(
      data=>{
        this.productos=data; 
        for(var i=0;i<this.productos.length;i++){
          this.stock(this.productos[i].id);
        }
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

  showImage(image:String,nombre:String,codeBar:String) {
    this.selectedImage = image;
    this.selectedNombre=nombre;
    this.selectedcodeBar=codeBar;
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

  onBuy(codeBar:string){
    this.prodtcutosService.agregarProducto(codeBar);
    this.prodtcutosService.cargarCarrito();
  }
 
}
