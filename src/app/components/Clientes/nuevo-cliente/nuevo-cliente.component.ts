import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateCliente } from 'src/app/models/create-cliente';
import { AuthService } from 'src/app/service/auth.service';;
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
})
export class NuevoClienteComponent implements OnInit {
  nombreUsuario!: string;
  edad!: number;
  password!: string;
  email!: string;
  telefono!: string;
  roles: string = 'ROLE_USER';

  constructor(private auth:AuthService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  onRegister(): void{
    console.log(this.nombreUsuario)
    const dto=new CreateCliente(this.nombreUsuario,this.edad,this.email,this.telefono,this.password,[this.roles]);
    this.auth.registerCliente(dto).subscribe(
      data=>{
        this.toastr.success(data.mensaje, 'OK', {timeOut: 3000}); 
        this.router.navigate(['login']);
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
      }
    );
  }
}
