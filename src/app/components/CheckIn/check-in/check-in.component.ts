import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../../service/check-in.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { CreateUser } from 'src/app/models/users';
import { CheckIn } from 'src/app/models/check-in';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent implements OnInit {
  title = 'qr-reader';
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];

  checkin!:CheckIn
  empleado!: CreateUser;
  reviewCheckIn: any;
  turno?: any;
  succes: boolean = false;

  constructor(
    private checkInService: CheckInService,
    private empledadoService: AuthService
  ) {}

  ngOnInit(): void {}

  //Método que se encarga de manejar la respuesta cuando se encuentran cámaras disponibles.
  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    // Se selecciona la primera cámara por defecto
    this.selectCamera(this.cameras[0].label);
  }

  //Método que se encarga de seleccionar una cámara.
  selectCamera(cameraLabel: string) {
    this.cameras.forEach((camera) => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        console.log(camera.label);
        // Se habilita el escáner de código QR
        this.scannerEnabled = true;
      }
    });
  }

  //Método que se encarga de crear un check-in de un empleado.
  createCheckIn(check: any) {
    console.log('Haciendo Checkin ...');
    this.checkInService.create(check).subscribe(
      (res) => {
        console.log(res);
        // Se muestra una alerta de éxito
        this.openModal();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Método que se encarga de manejar la respuesta cuando se escanea un código QR correctamente.
  scanSuccessHandler(event: string) {
    this.results.unshift(event);

    // Se extraen los datos del empleado del código QR
    const dataEmpleado = JSON.parse(event);

    let m = new Date().getMonth();
    m++;

    //Se almacenan los datos necesarios para el check-in
    this.checkin.idEmpleado = dataEmpleado.id;
    this.checkin.fecha =
      new Date().getDate().toString() +
      '-' +
      m.toString() +
      '-' +
      new Date().getFullYear().toString();
    this.checkin.hora =
      new Date().getHours().toString() +
      ':' +
      new Date().getMinutes().toString();

    console.log(this.checkin);

    //// Se revisa el historial de check-ins del empleado para determinar el tipo de check-in
    this.checkInService
      .reviewCheckIn(this.checkin.idEmpleado, this.checkin.fecha)
      .subscribe(
        (res) => {
          this.reviewCheckIn = res;
          console.log(this.reviewCheckIn);

          // Se obtiene el turno del empleado y se determina el tipo de check-in a realizar
          this.empledadoService
            .detail(this.checkin.idEmpleado)
            .subscribe((res) => {
              this.turno = res;
              console.log('Turno: ' + this.turno.turno);
              if (
                this.turno.turno == 'Matutino' ||
                this.turno.turno == 'Vespertino'
              ) {
                console.log('El turno es Mat o Vesp');
                if (this.reviewCheckIn.length == 0) {
                  this.checkin.tipo = 'Entrada';
                  this.createCheckIn(this.checkin);
                } else if (this.reviewCheckIn.length == 1) {
                  this.checkin.tipo = 'Salida';
                  this.createCheckIn(this.checkin);
                } else {
                  this.avisar();
                }
              }
            });
        },
        (err) => console.log(err)
      );
  }

  //Método que se encarga de mostrar un modal de registro exitoso.
  openModal(): void {
    this.scannerEnabled = false;
    Swal.fire({
      title: 'Register Sucessfull',
      html: '<p> Empleado: ' + this.checkin.idEmpleado.toString() + '</p>',
      icon: 'success',

      focusConfirm: false,
      confirmButtonText: 'Accept',
      confirmButtonColor: '#1a1a1a',
      customClass: {
        confirmButton: 'button-modal',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción cuando se hace clic en el botón de confirmación
        this.scannerEnabled = true;
      }
    });
  }

  //Método que se encarga de mostrar un modal de aviso cuando ya se han registrado todos los check-in en un día.
  avisar() {
    Swal.fire({
      title: 'Se han registrado todos los check-in',
      html: '<p> Empleado: ' + this.checkin.idEmpleado.toString() + '</p>',
      icon: 'info',
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1a1a1a',
      customClass: {
        confirmButton: 'button-modal',
      },
    });
  }
}
