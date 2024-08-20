import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/service/cliente.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css'],
})
export class VerClienteComponent implements OnInit {
  filterClientes = '';
  clientes: Clientes[] = [];
  isAdmin: boolean = false;
  isMan: boolean = false;
  isIns: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private token: TokenService,
  ) {}

  ngOnInit(): void {
    this.listaClientes();
    this.isAdmin = this.token.isAdmin();
  }

  listaClientes(): void {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.clienteService.list().subscribe(
      (data) => {
        Swal.close();
        this.clientes = data;

      },
      (err) => {
        Swal.close();
        console.log(err);
      }
    );
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo the action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(id).subscribe(
          (data) => {
            this.toastr.success('Customer Deleted', 'OK', {
              timeOut: 3000,
            });
            this.listaClientes();
          },
          (err) => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Canceled', 'Customer no Deleted', 'error');
      }
    });
  }
}
