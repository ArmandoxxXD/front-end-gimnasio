import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser, EditPassword, EditUser } from 'src/app/models/users';
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
  isUser: boolean = false;
  id!: number;
  empleado!: CreateUser;
  originalEmployeeData: any;
  currentPassword: String = '';
  newPassword: String = '';
  loggedUserId:number|null = this.token.getDatesId();
  fromListaEmpleado: boolean = false;
  previewUrl: any = null;
  isPhotoDeleted: boolean = false;
  hasValidPhoto: boolean = false;
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private token: TokenService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.fromListaEmpleado = params['from'] === 'employeeList';
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.isUser = this.token.isUser();
    this.getEmpleados();
  }

  onEdit(): void {
    const dto=new EditUser(this.empleado.nombreUsuario,this.empleado.foto,this.empleado.edad,this.empleado.sueldo,this.empleado.turno,this.empleado.email,this.empleado.telefono,this.empleado.roles);
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
            this.authService.update(this.id, dto).subscribe(
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
      this.authService.update(this.id, dto).subscribe(
        (data) => {
          this.toast.success(data.mensaje, 'OK', { timeOut: 3000 });
          if (this.fromListaEmpleado) {
            this.router.navigate(['/empelado/lista']); // Redirige a la lista de empleados
          } else {
            this.router.navigate(['/checkIn-empleado', this.id]);
          }
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
        console.log(this.empleado.foto)
        this.originalEmployeeData = JSON.parse(JSON.stringify(data));
      },
      (err) => {
        this.toast.error(err.error.mensaje, 'Error', { timeOut: 3000 });
        this.router.navigate(['empelado/lista']);
      }
    );
  }

  
  changePassword(): void {
      const dto=new EditPassword(this.currentPassword, this.newPassword);
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

  
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.empleado.foto = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
  
      reader.readAsDataURL(this.empleado.foto);
    }
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    if (!this.isPhotoDeleted) {
      this.empleado.foto = this.originalEmployeeData.foto;
    }
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
  
  deleteImage(): void {
    this.isPhotoDeleted = true;
    this.empleado.foto =  new File([], "");
    this.previewUrl = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }

}
