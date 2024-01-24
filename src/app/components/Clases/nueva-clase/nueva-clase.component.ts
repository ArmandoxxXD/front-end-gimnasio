import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clase } from 'src/app/models/clase';
import { CreateUser } from 'src/app/models/create-user';
import { AuthService } from 'src/app/service/auth.service';
import { ClaseService } from 'src/app/service/clase.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.css']
})
export class NuevaClaseComponent implements OnInit {
  isAdmin: boolean=false;

  nombreClase!:String;
  descripcion!:String;
  costo!:number;
  nombreInstructor!:String;
  fecha!:String;
  hora!: String;
  cupo!:number;
  fotoClase!:String;

  instructores:CreateUser[]=[];
  constructor(private claseService:ClaseService,private empleadoService:AuthService,private toast:ToastrService, private token:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.getInstructores();
    this.isAdmin = this.token.isAdmin();
  }

  getInstructores():void{
    this.empleadoService.listByRol("ROLE_INSTRUCTOR").subscribe(
      data=>{
        this.instructores=data;
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

  onCreate():void{
    const clase= new Clase(this.nombreClase,this.descripcion,this.costo,this.nombreInstructor,this.fecha,this.hora,this.cupo,this.fotoClase);
    this.claseService.create(clase).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.router.navigate(['/clase/lista'])
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    );
   }
}
