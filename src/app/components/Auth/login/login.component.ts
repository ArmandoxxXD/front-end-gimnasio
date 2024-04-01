import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombreUsuario!: string;
  password!: string;
  isCaptchaResolved: boolean = false;
  keyCaptcha: string = "6Lfer3cpAAAAALCRed8HizQpVzDL5EMcuWz2vQag";

  constructor(
    private auth:AuthService,
    private token:TokenService,
    private toastr:ToastrService,
    private router:Router,
    private route: ActivatedRoute 
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.verifyEmail(token);
      }
    });
  }

  verifyEmail(token: string): void {
    this.auth.validatedCount(token).subscribe(
      res => {
        this.toastr.success(res.mensaje, 'OK', {timeOut: 3000});
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000});
      }
    );
  }

  onLogin(): void {
    $('#loader-container').css('display', 'block');
    const dto= new LoginUser(this.nombreUsuario,this.password);
    if (!this.isCaptchaResolved) {
      this.toastr.error('Please resolve the captcha.', 'Fail', {timeOut: 3000});
      $('#loader-container').css('display', 'none');
      return;
    }
    this.auth.login(dto).subscribe(
      data=>{
        $('#loader-container').css('display', 'none');
        this.token.setToken(data.token);
        this.router.navigate(['/home']);
        location.reload();
      },
      err=>{
        $('#loader-container').css('display', 'none');
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


}
