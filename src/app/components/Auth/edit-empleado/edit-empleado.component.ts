import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, EditPassword, EditUser } from 'src/app/models/users';
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
  empleado!: User;
  originalEmployeeData!: User;
  currentPassword: String = '';
  newPassword: String = '';
  loggedUserId:number|null = this.token.getDatesId();
  fromListaEmpleado: boolean = false;
  previewUrl: any = null;
  isPhotoDeleted: boolean = false;
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
    const dto=new EditUser(this.empleado.nombreUsuario,this.empleado.foto,this.empleado.edad,this.empleado.sueldo,this.empleado.turno,this.empleado.email,this.empleado.telefono,this.empleado.roles,this.isPhotoDeleted);
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
            Swal.fire({
              title: 'Loading...',
              html: 'Creating account', // Mensaje adicional o puedes dejarlo vacío
              allowOutsideClick: false,
              position: 'top',
              didOpen: () => {
                Swal.showLoading(); // Muestra el spinner de SweetAlert2
              },
            });
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
      Swal.fire({
        title: 'Loading...',
        html: 'Creating account', // Mensaje adicional o puedes dejarlo vacío
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.authService.update(this.id, dto).subscribe(
        (data) => {
          Swal.close();
          this.toast.success(data.mensaje, 'OK', { timeOut: 3000 });
          if (this.fromListaEmpleado) {
            this.router.navigate(['/empelado/lista']); // Redirige a la lista de empleados
          } else {
            this.router.navigate(['/checkIn-empleado', this.id]);
          }
        },
        (err) => {
          Swal.close();
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
      const dto=new EditPassword(this.currentPassword, this.newPassword);
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        position: 'top',
        didOpen: () => {
          Swal.showLoading(); // Muestra el spinner de SweetAlert2
        },
      });
      this.authService.updatePassword(this.id, dto).subscribe(
        (response) => {
          Swal.close();
          this.toastr.success('Password successfully updated');
          const modalElement = document.getElementById('changePasswordModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtiene la instancia del modal
          modalInstance.hide(); 
          this.currentPassword='';
          this.newPassword='';
        },
        (error) => {
          Swal.close();
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

  evaluarPassword(password: string): boolean {
    const levelText = document.getElementById("password_requeriment__level") as HTMLDivElement;

    const longitudPassword = password.length >= 6;
    const mayusculaPassword = /[A-Z]/.test(password);
    const minusculaPassword = /[a-z]/.test(password);
    const numeroPassword = /[0-9]/.test(password);
    const simboloPassword = /[\W_]/.test(password);

    let booleanos: boolean[];
    booleanos = [longitudPassword, mayusculaPassword, minusculaPassword, numeroPassword, simboloPassword];
    let nivel = 0;

    for (let i = 0; i < booleanos.length; i++) {
      if(booleanos[i]){
        nivel += 1;
      }
    }

    switch (nivel) {
      case 0:
        levelText.innerHTML="Empty";
        levelText.style.color="black";
        break;
      case 1:
        levelText.innerHTML="Weak";
        levelText.style.color="#ba000c"
        break;
      case 2:
        levelText.innerHTML="Medium";
        levelText.style.color="#cf5504";
        break;
      case 3:
        levelText.innerHTML="Strong";
        levelText.style.color="#0054a3";
        break;
      case 4:
        levelText.innerHTML="Very Strong";
        levelText.style.color="#1600a3";
        break;
      case 5:
        levelText.innerHTML="Perfect";
        levelText.style.color="#00911d";
        break;
    }

    this.mostrarEvaluacionPassword(longitudPassword, mayusculaPassword, minusculaPassword, numeroPassword, simboloPassword);

    return longitudPassword && mayusculaPassword && minusculaPassword && numeroPassword && simboloPassword;
  }

  mostrarEvaluacionPassword(longitudPassword: boolean, mayusculaPassword: boolean, minusculaPassword: boolean, numeroPassword: boolean, simboloPassword: boolean): void {
    const longitud = document.getElementById("requeriment_1") as HTMLDivElement;
    const iconoLong = longitud.getElementsByTagName("i")[0];
    const textoLong = longitud.getElementsByTagName("p")[0];

    const minuscula = document.getElementById("requeriment_2") as HTMLDivElement;
    const iconoMin = minuscula.getElementsByTagName("i")[0];
    const textoMin = minuscula.getElementsByTagName("p")[0];

    const mayuscula = document.getElementById("requeriment_3") as HTMLDivElement;
    const iconoMay = mayuscula.getElementsByTagName("i")[0];
    const textoMay = mayuscula.getElementsByTagName("p")[0];

    const numero = document.getElementById("requeriment_4") as HTMLDivElement;
    const iconoNum = numero.getElementsByTagName("i")[0];
    const textoNum = numero.getElementsByTagName("p")[0];

    const simbolo = document.getElementById("requeriment_5") as HTMLDivElement;
    const iconoSim = simbolo.getElementsByTagName("i")[0];
    const textoSim = simbolo.getElementsByTagName("p")[0];

    if(longitudPassword){
      iconoLong.classList.remove("fa-xmark");
      iconoLong.classList.add("fa-check");
      iconoLong.style.color = "#019140";
      textoLong.style.color = "#019140";
    }else {
      iconoLong.classList.add("fa-xmark");
      iconoLong.classList.remove("fa-check");
      iconoLong.style.color = "#666";
      textoLong.style.color = "black";
    }

    if(minusculaPassword){
      iconoMin.classList.remove("fa-xmark");
      iconoMin.classList.add("fa-check");
      iconoMin.style.color = "#019140";
      textoMin.style.color = "#019140";
    }else {
      iconoMin.classList.add("fa-xmark");
      iconoMin.classList.remove("fa-check");
      iconoMin.style.color = "#666";
      textoMin.style.color = "black";
    }

    if(mayusculaPassword){
      iconoMay.classList.remove("fa-xmark");
      iconoMay.classList.add("fa-check");
      iconoMay.style.color = "#019140";
      textoMay.style.color = "#019140";
    }else {
      iconoMay.classList.add("fa-xmark");
      iconoMay.classList.remove("fa-check");
      iconoMay.style.color = "#666";
      textoMay.style.color = "black";
    }

    if(numeroPassword){
      iconoNum.classList.remove("fa-xmark");
      iconoNum.classList.add("fa-check");
      iconoNum.style.color = "#019140";
      textoNum.style.color = "#019140";
    }else {
      iconoNum.classList.add("fa-xmark");
      iconoNum.classList.remove("fa-check");
      iconoNum.style.color = "#666";
      textoNum.style.color = "black";
    }

    if(simboloPassword){
      iconoSim.classList.remove("fa-xmark");
      iconoSim.classList.add("fa-check");
      iconoSim.style.color = "#019140";
      textoSim.style.color = "#019140";
    }else {
      iconoSim.classList.add("fa-xmark");
      iconoSim.classList.remove("fa-check");
      iconoSim.style.color = "#666";
      textoSim.style.color = "black";
    }

  }

}
