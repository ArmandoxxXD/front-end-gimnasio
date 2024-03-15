import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isAdmin: boolean = false;
  nombreUsuario!: string;
  foto!: File;
  edad!: number;
  sueldo!: number;
  turno!: String;
  password!: string;
  email!: string;
  telefono!: String;
  roles!: Optional;
  previewUrl: any = null;


  constructor(private auth:AuthService,private token:TokenService,private toastr:ToastrService,private router:Router) {
    this.isAdmin = this.token.isAdmin();
   }

  ngOnInit(): void {
  }

  onCreate(): void{
    const dto=new CreateUser(this.nombreUsuario,this.foto,this.edad,this.sueldo,this.turno,this.email,this.telefono,this.password,[this.roles]);
    this.auth.register(dto).subscribe(
      data=>{
        this.toastr.success(data.mensaje, 'OK', {timeOut: 3000}); 
        this.router.navigate(['empelado/lista']);
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.foto = event.target.files[0];
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };

    reader.readAsDataURL(this.foto!);
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    this.foto = new File([], "");
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
}
