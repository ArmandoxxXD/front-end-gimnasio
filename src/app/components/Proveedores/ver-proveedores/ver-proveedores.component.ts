import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-proveedores',
  templateUrl: './ver-proveedores.component.html',
  styleUrls: ['./ver-proveedores.component.css']
})
export class VerProveedoresComponent implements OnInit {
  proveedores:Proveedor[]=[];
  isAdmin:boolean=false;
  filterProvedor='';
  constructor(private proveedorService:ProveedorService,private toast:ToastrService, private token:TokenService) { }

  ngOnInit(): void {
    this.getProveedores();
    this.isAdmin = this.token.isAdmin();
  }

  getProveedores():void{
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.proveedorService.list().subscribe(
      data=>{
        Swal.close();
        this.proveedores=data;
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
          this.proveedorService.delete(id).subscribe(
            data=>{
              this.toast.success(data.mensaje,'OK',{timeOut:3000});
              this.getProveedores();
            },
            err=>{
              this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
            }
          );
        }else if(result.dismiss===Swal.DismissReason.cancel){
          Swal.fire(
            'Cancelled',
            'Provider not eliminated',
            'error'
          )
        }
      })
  }

}
