import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Clase } from 'src/app/models/clase';
import { ClaseService } from 'src/app/service/clase.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-clases',
  templateUrl: './ver-clases.component.html',
  styleUrls: ['./ver-clases.component.css'],
})
export class VerClasesComponent implements OnInit {
  clases: Clase[] = [];
  isAdmin: boolean = false;
  filterClase = '';
  filteredFecha: string = '';
  filteredHora: string = '';
  constructor(
    private claseService: ClaseService,
    private toast: ToastrService,
    private token: TokenService
  ) {
    //document.body.style.height="100%"
  }

  ngOnInit(): void {
    this.getClases();
    this.isAdmin = this.token.isAdmin();
  }

  getClases(): void {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.claseService.list().subscribe(
      (data) => {
        Swal.close();
        this.clases = data;
      },
      (err) => {
        Swal.close();
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
      }
    );
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to remove the action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.claseService.delete(id).subscribe(
          (data) => {
            this.toast.success(data.mensaje, 'Ok', { timeOut: 3000 });
            this.getClases();
          },
          (err) => {
            this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Class not eliminated', 'error');
      }
    });
  }

  limpiarFiltros() {
    this.filteredHora = '';
    this.filteredFecha = '';
  }
}
