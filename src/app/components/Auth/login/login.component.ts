import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth:AuthService,private token:TokenService,private toastr:ToastrService,private router:Router) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    $('#loader-container').css('display', 'block');
    const dto= new LoginUser(this.nombreUsuario,this.password);
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

}
