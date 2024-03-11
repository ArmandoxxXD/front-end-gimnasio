import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser, EditPassword } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css'],
})
export class EditEmpleadoComponent implements OnInit {
  
  isAdmin: boolean = false;
  id!: number;
  empleado!: CreateUser;
  originalEmployeeData: any;
  currentPassword: String = '';
  newPassword: String = '';

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private token: TokenService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getEmpleados();
  }

  onEdit(): void {
    if (this.token.getDatesId() === this.empleado.id &&
      this.empleado.nombreUsuario !== this.originalEmployeeData.nombreUsuario) {
      Swal.fire({
        title: 'Are you safe in editing user information?',
        text: 'Editing the username closes the current session so that the changes can be reflected correctly', //+this.selectedRol.Nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it',
        confirmButtonColor: '#1a1a1a',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#b9b9b9',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Done!',
            text: 'You have edit the employee ' + this.originalEmployeeData.nombreUsuario,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1a1a1a',
          }).then((result) => { 
            this.authService.update(this.id, this.empleado).subscribe(
              (data) => {
                this.toast.success(data.mensaje, 'OK', { timeOut: 3000 });
                this.token.logOut();
              },
              (err) => {
                this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
              }
            );
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Canceled',
            text: 'The employee has not been edit',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1a1a1a',
          });
        }
      });
    } else {
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
  }

  getEmpleados() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.authService.detail(this.id).subscribe(
      (data) => {
        this.empleado = data;
        this.originalEmployeeData = JSON.parse(JSON.stringify(data));
      },
      (err) => {
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        this.router.navigate(['empelado/lista']);
      }
    );
  }

  
  changePassword(): void {
    console.log(this.currentPassword, this.newPassword);
      const dto=new EditPassword(this.currentPassword, this.newPassword);
      console.log(dto)
      this.authService.updatePassword(this.id, dto).subscribe(
        (response) => {
          this.toastr.success('Password successfully updated');
          const modalElement = document.getElementById('changePasswordModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtiene la instancia del modal
          modalInstance.hide(); 
          this.currentPassword='';
          this.newPassword='';
        },
        (error) => {
          this.toastr.error('Error: ' + (error.error.mensaje || error.message));
        }
      );
  }

  hasChanges(): boolean {
    return JSON.stringify(this.originalEmployeeData) !== JSON.stringify(this.empleado);
  }
}
