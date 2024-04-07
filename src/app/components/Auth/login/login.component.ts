import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { ResetPassword } from 'src/app/models/users';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  nombreUsuario!: string;
  password!: string;
  isCaptchaResolved: boolean = false;
  keyCaptcha: string = "6Lfer3cpAAAAALCRed8HizQpVzDL5EMcuWz2vQag";
  twoFactorRequired = false;
  twoFactorUserId: number | null = null;
  authToken: any;
  twoFactorCode: string = '';
  countdownInterval: any;
  duration = 0;
  twoFactorCodeExpiration :any;
  identificator: String = '';
  newPassword: String = '';
  idUserResetPassword!: number;;

  constructor(
    private auth:AuthService,
    private token:TokenService,
    private toastr:ToastrService,
    private router:Router,
    private route: ActivatedRoute 
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tokenVerifyAcoount = params['tokenVerifyAccount'];
      if (tokenVerifyAcoount) {
        this.verifyEmail(tokenVerifyAcoount);
      }
      const tokenPasswordReset = params['tokenPasswordReset'];
      if (tokenPasswordReset) {
        this.passwordReset(tokenPasswordReset);
      }
    });
  }


  verifyEmail(token: string): void {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.auth.validatedCount(token).subscribe(
      res => {
        Swal.close();
        this.toastr.success(res.mensaje, 'OK', {timeOut: 3000});
      },
      err => {
        Swal.close();
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000});
      }
    );
  }

  passwordReset(token: string): void {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.auth.validatedPasswordReset(token).subscribe(
      res => {
        console.log(res);
        this.idUserResetPassword = res.id;
        Swal.close();
        this.toastr.success(res.mensaje, 'OK', {timeOut: 3000});
        this.showResetPasswordModal();
      },
      err => {
        Swal.close();
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000});
      }
    );
  }


  initializeCountdown(): void {
    this.stopCountdown(); // Detiene cualquier contador existente
    const expirationDate = new Date(this.twoFactorCodeExpiration).getTime();
    const now = new Date().getTime();
    this.duration = Math.floor((expirationDate - now) / 1000);
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown(): void {
    let minutes = Math.floor(this.duration / 60);
    let seconds = this.duration % 60;
    let countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    if (this.duration <= 0) {
      this.stopCountdown();
      this.toastr.info('The code has expired. Please request a new code', 'Information');
    } else {
      this.duration--; // Decrementa la duración
    }
  }


  stopCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  verifyTwoFactorCode(): void {
    if (this.twoFactorUserId && this.twoFactorCode) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.auth.verifyTwoFactorCode(this.twoFactorUserId, this.twoFactorCode).subscribe(
        (response) => {
          Swal.close();
          this.toastr.success(response.mensaje, 'OK');
          this.hideTwoFactorModal();
          this.stopCountdown();
          this.token.setToken(this.authToken);
          this.router.navigate(['/home']);
          location.reload();
        },
        error => {
          Swal.close();
          this.toastr.error(error.error.mensaje, 'Fail');
        }
      );
    } else {

    }
  }

  resendCode(): void {
    if (this.twoFactorUserId) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.auth.resendTwoFactorCode(this.twoFactorUserId).subscribe(
        (response) => {
          Swal.close();
          this.toastr.success(response.mensaje, 'OK');
          this.twoFactorCodeExpiration = response.fechaExpiracion;
          this.initializeCountdown();
        },
        error => {
          Swal.close();
          this.toastr.error(error.error.mensaje, 'Error');
        }
      );
    }
  }

  onLogin(): void {
    const dto= new LoginUser(this.nombreUsuario,this.password);
    if (!this.isCaptchaResolved) {
      this.toastr.error('Please resolve the captcha.', 'Fail', {timeOut: 3000});
      return;
    }
    Swal.fire({
      title: 'Loading...',
      html: 'Logging in', // Mensaje adicional o puedes dejarlo vacío
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
      this.auth.login(dto).subscribe(
        data=>{
          this.authToken = data.token;
          const payload = this.authToken!.split('.')[1];
          const payloadDecoded = atob(payload);
          const values = JSON.parse(payloadDecoded);
          const id = values.id;
          this.twoFactorRequired = values.configuration.twoFactorAuth;
          this.twoFactorCodeExpiration = values.configuration.twoFactorAuthExpiration;
          Swal.close();
          if (this.twoFactorRequired) {
            this.twoFactorUserId = id;
            this.initializeCountdown();
            this.showTwoFactorModal()
            this.toastr.info(data.mensaje, 'Information');
          } else {
            this.token.setToken(data.token);
            this.router.navigate(['/home']);
            location.reload();
          }
        },
        err=>{
          Swal.close();
          this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
        }
      );
   
  }

  onCaptchaResolved(captchaResponse: string) {
    this.isCaptchaResolved = true;
    if (captchaResponse === null){
      this.isCaptchaResolved = false;
    }
  }

  showTwoFactorModal(): void {
    const twoFactorModalElement = $('#twoFactorModal');
    const modal = new bootstrap.Modal(twoFactorModalElement[0]);
    modal.show();
    }
  
  
  hideTwoFactorModal(): void {
    const twoFactorModalElement = $('#twoFactorModal');
    const modal = new bootstrap.Modal(twoFactorModalElement[0]);
    modal.hide();
  }

  showIdentificationModal(): void {
    const identificationModalElement = $('#identificationModal');
    const modal = new bootstrap.Modal(identificationModalElement[0]);
    modal.show();
    }

  showResetPasswordModal(): void {
    const resetPasswordModalElement = $('#resetPasswordModal');
    const modal = new bootstrap.Modal(resetPasswordModalElement[0]);
    modal.show();
    }
  
  hideResetPasswordModal(): void {
    const resetPasswordModalElement = document.getElementById('resetPasswordModal');
      const modalInstance = bootstrap.Modal.getInstance(resetPasswordModalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
  }

  sendTokenPasswordReset(): void {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.auth.sendTokenPasswordReset(this.identificator).subscribe(
      data=>{
        Swal.close();
        this.toastr.success(data.mensaje, 'Ok');
      },
      err=>{
        Swal.close();
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000}); 
      }
    )
  }

  changePassword(): void {
    const dto=new ResetPassword(this.newPassword);
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.auth.resentPassword(this.idUserResetPassword, dto).subscribe(
      (response) => {
        Swal.close();
        this.toastr.success(response.mensaje,'OK');
        this.hideResetPasswordModal()
        this.newPassword='';
      },
      (error) => {
        Swal.close();
        this.toastr.error('Error: ' + (error.error.mensaje || error.message));
      }
    );
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
