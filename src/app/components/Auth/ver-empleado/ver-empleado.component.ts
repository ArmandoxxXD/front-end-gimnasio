import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css'],
})
export class VerEmpleadoComponent implements OnInit {
  isAdmin: boolean = false;
  filterPost = '';
  employees: any = [];
  roles: any = [];
  loggedUserId:number|null = this.token.getDatesId();

  constructor(
    private authService: AuthService,
    private router: Router,
    private token: TokenService
  ) {
    this.authService.list().subscribe(
      (resp) => {
        this.employees =  resp.filter(employee => employee.roles != 'ROLE_USER')
      },
      (err) => console.error(err)
    );
  }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
  }

  deleteEmployee(employee: any) {
    console.log(employee);
    console.log(employee.IdEmpleado);
    Swal.fire({
      title: 'Do you want to delete the employee?', //+this.selectedRol.Nombre,//Estás seguro?
      text: 'This action can´t be undone.', //+this.selectedRol.Nombre,
      html: '<p><strong>Employee: </strong>' + employee.nombreUsuario + '</p>',
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
          text: 'You have deleted the employee ' + employee.nombreUsuario,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1a1a1a',
        });
        //this.deleteRol(rol);
        this.authService.delete(employee.id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => console.error(err)
        );
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Canceled',
          text: 'The employee has not been deleted',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1a1a1a',
        });
      }
    });
  }

  showQR(empQR: any) {
    delete empQR.Password;
    let data = JSON.stringify(empQR);
    let encodedData = encodeURIComponent(data);
    let api =
      'https://api.qrserver.com/v1/create-qr-code/?data=' +
      encodedData +
      '&size=250x250';
    console.log(api);

    console.log(data);
    Swal.fire({
      title: 'Employee QR',
      html:
        '<p>' +
        empQR.nombreUsuario +
        '</p><img src="' +
        api +
        '" height="250px" width="250px">', // height="50px" width="50px"
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#1a1a1a',
    });
  }
}
