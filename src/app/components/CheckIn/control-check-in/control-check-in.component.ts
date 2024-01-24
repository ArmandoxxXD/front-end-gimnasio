import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-control-check-in',
  templateUrl: './control-check-in.component.html',
  styleUrls: ['./control-check-in.component.css']
})
export class ControlCheckInComponent implements OnInit {

  employees: any = [];

  constructor(private empleadoService: AuthService, private router:Router) { 
    this.empleadoService.list().subscribe(
      resp=>{
        console.log(resp);
        this.employees = resp;
        console.log(this.employees[2].Nombre);
      },
      err => console.error(err)
    );
  }


  ngOnInit(): void {
  }


}
