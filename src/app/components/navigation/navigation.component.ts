import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  isRecepcionista: boolean = false;
  isUser: boolean = false;
  userName: string = '';
  constructor(private token: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.token.isLogged();
    this.isAdmin = this.token.isAdmin();
    this.isInstructor = this.token.isInstructor();
    this.isRecepcionista = this.token.isRecepcionista();
    this.isUser = this.token.isUser();
    this.userName = this.token.getDatesUser();
  }

  logOut(): void {
    this.token.logOut();
    location.reload();
    this.router.navigate(['localhost:4200/home']);
  }
}
