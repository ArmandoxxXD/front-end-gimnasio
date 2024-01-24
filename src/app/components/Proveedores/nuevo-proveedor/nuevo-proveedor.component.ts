import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {
    isAdmin: boolean=false;

    nombreProvedor!:string ;
    telefono!: string ;
    email!:string;
    logo!: string;
    pais!:string;
    estado!:string;
    municipio!: string;
    calle!: string;
  constructor(private proveedorService:ProveedorService,private toast:ToastrService, private token:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
  }

 onCreate():void{
  const proveedor= new Proveedor(this.nombreProvedor,this.telefono,this.email,this.logo,this.pais,this.estado,this.municipio,this.calle);
  this.proveedorService.create(proveedor).subscribe(
    data=>{
      this.toast.success(data.mensaje,'OK',{timeOut:3000});
      this.router.navigate(['/proveedor/lista'])
    },
    err=>{
      this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
    }
  );
 }
}
