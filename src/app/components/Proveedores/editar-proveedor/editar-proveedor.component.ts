import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {
  isAdmin: boolean=false;
  id!:number;
  proveedor!:Proveedor;

  constructor(
    private proveedorService:ProveedorService,
    private toast:ToastrService, 
    private token:TokenService,
    private router:Router, 
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getProvedor();
  }

  onUpdate():void{
    this.proveedorService.update(this.id,this.proveedor).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.router.navigate(['/proveedor/lista'])
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    );
  }

  getProvedor(){
    this.id= this.activateRoute.snapshot.params['id'];
    this.proveedorService.detail(this.id).subscribe(
      data=>{
        this.proveedor=data;
        console.log(this.proveedor)
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/proveedor/lista'])
      }
    );
  }
}
