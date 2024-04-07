import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isAdmin: boolean = false;
  nombreUsuario!: string;
  foto: File = new File([], "");
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
    const dto=new User(this.nombreUsuario,this.foto,this.edad,this.sueldo,this.turno,this.email,this.telefono,this.password,[this.roles]);
    Swal.fire({
      title: 'Loading...',
      html: 'Creating account', // Mensaje adicional o puedes dejarlo vacío
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.auth.register(dto).subscribe(
      data=>{
        Swal.close();
        this.toastr.success(data.mensaje, 'OK', {timeOut: 3000}); 
        this.router.navigate(['empelado/lista']);
      },
      err=>{
        Swal.close();
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


  evaluarPassword(password: string): boolean {
    const levelText = document.getElementById("password_requeriment__level") as HTMLDivElement;

    const longitudPassword = password.length >= 6;
    const mayusculaPassword = /[A-Z]/.test(password);
    const minusculaPassword = /[a-z]/.test(password);
    const numeroPassword = /[0-9]/.test(password);
    const simboloPassword = /[\W_]/.test(password);

    let booleanos: boolean[];
    booleanos = [longitudPassword, mayusculaPassword, minusculaPassword, numeroPassword, simboloPassword];
    let nivel = 0;

    for (let i = 0; i < booleanos.length; i++) {
      if(booleanos[i]){
        nivel += 1;
      }
    }

    switch (nivel) {
      case 0:
        levelText.innerHTML="Empty";
        levelText.style.color="black";
        break;
      case 1:
        levelText.innerHTML="Weak";
        levelText.style.color="#ba000c"
        break;
      case 2:
        levelText.innerHTML="Medium";
        levelText.style.color="#cf5504";
        break;
      case 3:
        levelText.innerHTML="Strong";
        levelText.style.color="#0054a3";
        break;
      case 4:
        levelText.innerHTML="Very Strong";
        levelText.style.color="#1600a3";
        break;
      case 5:
        levelText.innerHTML="Perfect";
        levelText.style.color="#00911d";
        break;
    }

    this.mostrarEvaluacionPassword(longitudPassword, mayusculaPassword, minusculaPassword, numeroPassword, simboloPassword);

    return longitudPassword && mayusculaPassword && minusculaPassword && numeroPassword && simboloPassword;
  }

  mostrarEvaluacionPassword(longitudPassword: boolean, mayusculaPassword: boolean, minusculaPassword: boolean, numeroPassword: boolean, simboloPassword: boolean): void {
    const longitud = document.getElementById("requeriment_1") as HTMLDivElement;
    const iconoLong = longitud.getElementsByTagName("i")[0];
    const textoLong = longitud.getElementsByTagName("p")[0];

    const minuscula = document.getElementById("requeriment_2") as HTMLDivElement;
    const iconoMin = minuscula.getElementsByTagName("i")[0];
    const textoMin = minuscula.getElementsByTagName("p")[0];

    const mayuscula = document.getElementById("requeriment_3") as HTMLDivElement;
    const iconoMay = mayuscula.getElementsByTagName("i")[0];
    const textoMay = mayuscula.getElementsByTagName("p")[0];

    const numero = document.getElementById("requeriment_4") as HTMLDivElement;
    const iconoNum = numero.getElementsByTagName("i")[0];
    const textoNum = numero.getElementsByTagName("p")[0];

    const simbolo = document.getElementById("requeriment_5") as HTMLDivElement;
    const iconoSim = simbolo.getElementsByTagName("i")[0];
    const textoSim = simbolo.getElementsByTagName("p")[0];

    if(longitudPassword){
      iconoLong.classList.remove("fa-xmark");
      iconoLong.classList.add("fa-check");
      iconoLong.style.color = "#019140";
      textoLong.style.color = "#019140";
    }else {
      iconoLong.classList.add("fa-xmark");
      iconoLong.classList.remove("fa-check");
      iconoLong.style.color = "#666";
      textoLong.style.color = "black";
    }

    if(minusculaPassword){
      iconoMin.classList.remove("fa-xmark");
      iconoMin.classList.add("fa-check");
      iconoMin.style.color = "#019140";
      textoMin.style.color = "#019140";
    }else {
      iconoMin.classList.add("fa-xmark");
      iconoMin.classList.remove("fa-check");
      iconoMin.style.color = "#666";
      textoMin.style.color = "black";
    }

    if(mayusculaPassword){
      iconoMay.classList.remove("fa-xmark");
      iconoMay.classList.add("fa-check");
      iconoMay.style.color = "#019140";
      textoMay.style.color = "#019140";
    }else {
      iconoMay.classList.add("fa-xmark");
      iconoMay.classList.remove("fa-check");
      iconoMay.style.color = "#666";
      textoMay.style.color = "black";
    }

    if(numeroPassword){
      iconoNum.classList.remove("fa-xmark");
      iconoNum.classList.add("fa-check");
      iconoNum.style.color = "#019140";
      textoNum.style.color = "#019140";
    }else {
      iconoNum.classList.add("fa-xmark");
      iconoNum.classList.remove("fa-check");
      iconoNum.style.color = "#666";
      textoNum.style.color = "black";
    }

    if(simboloPassword){
      iconoSim.classList.remove("fa-xmark");
      iconoSim.classList.add("fa-check");
      iconoSim.style.color = "#019140";
      textoSim.style.color = "#019140";
    }else {
      iconoSim.classList.add("fa-xmark");
      iconoSim.classList.remove("fa-check");
      iconoSim.style.color = "#666";
      textoSim.style.color = "black";
    }

  }
  

}
