import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import * as $ from 'jquery';
import { BuscadorService } from 'src/app/service/buscador.service';

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
  searchText?: string;
  searchResults?: string[];
  constructor(private token: TokenService, private router: Router, private searchService: BuscadorService) {}

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

  search(): void {
    if (this.searchText) {
      this.searchService.search(this.searchText).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    console.log(this.searchResults);
  }

}
