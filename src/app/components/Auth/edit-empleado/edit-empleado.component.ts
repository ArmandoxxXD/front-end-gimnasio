import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckIn } from 'src/app/models/check-in';
import { CreateUser } from 'src/app/models/create-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css'],
})
export class EditEmpleadoComponent implements OnInit {
  isAdmin: boolean = false;
  id!: number;
  empleado!: CreateUser;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private token: TokenService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getEmpleados();
  }

  onEdit(): void {
    this.authService.update(this.id, this.empleado).subscribe(
      (data) => {
        this.toast.success(data.mensaje, 'OK', { timeOut: 3000 });
        this.router.navigate(['empelado/lista']);
      },
      (err) => {
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  getEmpleados() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.authService.detail(this.id).subscribe(
      (data) => {
        this.empleado = data;
      },
      (err) => {
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        this.router.navigate(['empelado/lista']);
      }
    );
  }
}
