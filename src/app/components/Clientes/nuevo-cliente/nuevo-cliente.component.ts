import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clase } from 'src/app/models/clase';
import { Clientes } from 'src/app/models/clientes';
import { ClaseService } from 'src/app/service/clase.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
})
export class NuevoClienteComponent implements OnInit {
  isAdmin: boolean = false;
  aux: String[] = [];
  nombreCliente!: String;
  nombreClase: String[] = [];
  edad!: number;
  email!: String;
  telefono!: String;
  subcripcion!: number;

  opcion!: String;

  clases: Clase[] = [];
  constructor(
    private clienteService: ClienteService,
    private claseService: ClaseService,
    private toastr: ToastrService,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.getClases();
    this.isAdmin = this.token.isAdmin();
  }

  onCreate(): void {
    const cliente = new Clientes(
      this.nombreCliente,
      this.nombreClase,
      this.edad,
      this.email,
      this.telefono,
      this.subcripcion
    );
    this.clienteService.save(cliente).subscribe(
      (data) => {
        this.toastr.success('Client Saved', 'OK', {
          timeOut: 3000,
        });
        this.router.navigate(['/cliente/lista']);
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
        });
      }
    );
  }

  getClases(): void {
    this.claseService.list().subscribe(
      (data) => {
        this.clases = data;
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  // onClaseChange(opcion: String) {
  //   if (this.nombreClase.includes(opcion)) {
  //     this.nombreClase = this.nombreClase.filter((c) => c !== opcion);
  //   } else {
  //     this.aux.push(opcion);
  //     this.nombreClase = this.aux.filter((elem, index, arr) => {
  //       return arr.indexOf(elem) === index;
  //     });
  //   }
  // }

  onClaseChange(opcion: String) {
    console.log(opcion);
    if (this.nombreClase.includes(opcion)) {
      this.nombreClase = this.nombreClase.filter((c) => c !== opcion);
    } else {
      this.aux.push(opcion);
      this.nombreClase = this.aux.filter((elem, index, arr) => {
        return arr.indexOf(elem) === index;
      });
    }
  }
}
