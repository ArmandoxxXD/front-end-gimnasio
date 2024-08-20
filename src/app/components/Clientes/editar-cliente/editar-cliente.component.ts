import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/service/cliente.service';
import { TokenService } from 'src/app/service/token.service';
import { ClaseService } from 'src/app/service/clase.service';
import { Clase } from 'src/app/models/clase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  aux: String[] = [];
  isAdmin: boolean = false;
  cliente!: Clientes;
  clases: Clase[] = [];
  opcion!: String;
  originalCustomerData!: Clientes;

  constructor(
    private clienteService: ClienteService,
    private claseService: ClaseService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private token: TokenService
  ) {}
  ngOnInit() {
    this.isAdmin = this.token.isAdmin();
    this.getClientes();
    this.getClases();
  }

  onUpdate(): void {
    const id = this.activateRoute.snapshot.params['id'];
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.clienteService.update(id, this.cliente).subscribe(
      (data) => {
        Swal.close();
        this.toastr.success('Cliente Actualizado', 'OK', {
          timeOut: 3000,
        });
        this.router.navigate(['/cliente/lista']);
      },
      (err) => {
        Swal.close();
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
        });
        this.router.navigate(['/cliente/lista']);
      }
    );
  }

  getClientes(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.clienteService.detail(id).subscribe(
      (data) => {
        this.cliente = data;
        this.originalCustomerData =JSON.parse(JSON.stringify(data));
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
        });
        this.router.navigate(['/lista']);
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

  onClaseChange(event: any, opcion: String) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.aux.push(opcion);
      this.cliente.nombreClase = this.aux.filter((elem, index, arr) => {
        return arr.indexOf(elem) === index;
      });
    } else {
      this.cliente.nombreClase = this.cliente.nombreClase.filter(
        (c) => c !== opcion
      );
    }
  }

  hasChanges(): boolean {
    return JSON.stringify(this.originalCustomerData) !== JSON.stringify(this.cliente);
  }
}
