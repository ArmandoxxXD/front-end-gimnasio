import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CheckInService } from 'src/app/service/check-in.service';
import Chart from 'chart.js/auto';
import { CheckIn } from 'src/app/models/check-in';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-check-in',
  templateUrl: './empleado-check-in.component.html',
  styleUrls: ['./empleado-check-in.component.css'],
})
export class EmpleadoCheckInComponent implements OnInit {
  p: any;
  emp: any;
  pla: any = [];
  checks: any = [];
  r: any = [];
  dataCalendar: any = [];
  diasVen: string[] = ['12-2-2023', '13-2-2023', '18-2-2023'];
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;
  chart!: Chart;
  
  private calendar!: HTMLElement;
  private prevBtn!: HTMLElement;
  private nextBtn!: HTMLElement;
  private monthTitle!: HTMLElement;
  private grid!: HTMLElement;

  private date = new Date();
  private year = this.date.getFullYear();
  private month = this.date.getMonth();
  private today = this.date.getDate();

  private asistencias: string[] = [];
  private faltas: string[] = [];
  private retardos: string[] = [];

  constructor(
    private capyfit: AuthService,
    private route: ActivatedRoute,
    private checkin: CheckInService
  ) {
    const params = this.route.snapshot.params;
    this.p = params;
    this.capyfit.detail(params['id']).subscribe(
      (res) => {
        this.emp = res;
      },
      (err) => console.log(err)
    );
  }

  cargarRet() {
    this.checkin.listCheckInForIdEmpleado(this.p['id']).subscribe(
      (resp) => {
        this.pla = resp;
        for (let i = 0; i < this.pla.length; i++) {
          let [day, month, year] = this.pla[i].fecha.split('-');
          let newMonth = month - 1;
          this.pla[i].fecha = `${day}-${newMonth}-${year}`;
        }
        this.pla.forEach((element: CheckIn) => {
          if (element.tipo === 'Entrada') {
            let [hours1, minutes1] = element.hora.split(':');
            let totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
            let ho = '';
            console.log('Turno: ' + this.emp.turno);
            if (this.emp.turno === 'Matutino') {
              ho = '08:05';
            } else {
              ho = '18:05';
            }
            let [hours2, minutes2] = ho.split(':');
            let totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);
            if (totalMinutes1 > totalMinutes2) {
              element.estado = 'Retardo';
            } else {
              element.estado = 'Asistencia';
            }
            this.r = element;
          }
          this.updateCalendar();
        });
      },
      (err) => console.error(err)
    );
    this.updateCalendar();
  }

  ngOnInit(): void {
    this.calendar = document.querySelector('.calendar')!;
    this.prevBtn = this.calendar.querySelector('.prev-month-btn')!;
    this.nextBtn = this.calendar.querySelector('.next-month-btn')!;
    this.monthTitle = this.calendar.querySelector('.calendar-month')!;
    this.grid = this.calendar.querySelector('.calendar-grid')!;

    this.asistencias = [];
    this.faltas = [];
    this.retardos = [];

    //this.checarHora();

    this.checkin.listCheckInForIdEmpleado(this.p['id']).subscribe(
      (resp) => {
        this.checks = resp;
        this.checks.forEach((ch: CheckIn) => {
          if (ch.tipo === 'Entrada') {
            ch.tipo = 'Entry';
          } else {
            ch.tipo = 'Departure';
          }
        });
        // for (let i = 0; i < this.checks.length; i++) {
        //   let [day, month, year] = this.checks[i].fecha.split('-');
        //   let newMonth = month - 1;
        //   this.checks[i].fecha = `${day}-${newMonth}-${year}`;
        // }
      },
      (err) => console.error(err)
    );

    this.updateCalendar();

    this.prevBtn.addEventListener('click', () => {
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
      this.updateCalendar();
    });

    this.nextBtn.addEventListener('click', () => {
      if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
      this.updateCalendar();
    });

    this.xd();
  }

  private updateCalendar(): void {
    if (this.r.estado === 'Retardo') {
      if (!this.retardos.includes(this.r.fecha)) {
        this.retardos.push(this.r.fecha);
      }
      console.log(this.retardos);
    }

    if (this.r.estado === 'Asistencia') {
      console.log('Hello');
      if (!this.asistencias.includes(this.r.fecha)) {
        this.asistencias.push(this.r.fecha);
      }
      console.log(this.asistencias);
      //console.log(this.retardos);
    }

    //this.checarHora();
    console.log('F U C');

    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();

    this.monthTitle.textContent = new Date(
      this.year,
      this.month
    ).toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Clear the grid
    this.grid.innerHTML = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-day');
      cell.classList.add('non-day');
      this.grid.appendChild(cell);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-day');
      if (
        i === this.today &&
        this.year === this.date.getFullYear() &&
        this.month === this.date.getMonth()
      ) {
        cell.classList.add('today');
      }
      let fechaCa = i + '-' + this.month + '-' + this.year;
      if (this.asistencias.includes(fechaCa)) {
        cell.classList.add('green');
      }
      if (this.faltas.includes(fechaCa)) {
        cell.classList.add('red');
      }
      if (this.retardos.includes(fechaCa)) {
        cell.classList.add('yellow');
        console.log(fechaCa);
      }

      cell.textContent = i.toString();
      this.grid.appendChild(cell);
    }

    const calendarDays = document.querySelectorAll('.calendar-day');

    calendarDays.forEach((day: Element) => {
      day.addEventListener('click', () => {
        let fecha: string = '';
        if (day.textContent) {
          let mes = this.month + 1;
          fecha = day.textContent + '-' + mes + '-' + this.year;
          this.checkin.reviewCheckIn(this.emp.id, fecha).subscribe((res) => {
            this.dataCalendar = res;
            let entry = document.getElementById(
              'entry'
            ) as HTMLParagraphElement;
            let horaES: any = [];
            // Si hay datos en la respuesta, actualiza la hora de entrada en la interfaz de usuario
            if (this.dataCalendar.length != 0) {
              this.dataCalendar.forEach((c: any) => {
                if (c.tipo === 'Entrada') {
                  entry.textContent = c.hora;
                  horaES[0] = c.hora;
                } else if (c.tipo === 'Salida') {
                  horaES[1] = c.hora;
                }
                Swal.fire({
                  title: 'Data of the day',
                  html:
                    'Entry Time: ' +
                    horaES[0] +
                    '<br>Departure Time: ' +
                    horaES[1],
                  icon: 'info',
                  showCloseButton: true,
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#1a1a1a',
                });
                console.log(c.Hora);
              });
            } else {
              // Si no hay datos en la respuesta, establece el texto en "Ningún día seleccionado"
              entry.textContent = 'No day selected';
              Swal.fire({
                title: 'Error',
                html: 'Select a valid day',
                icon: 'error',
                showCloseButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#1a1a1a',
              });
            }
          });
        } else {
          console.log('Fecha no válida');
        }
      });
    });
  }

  xd(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../assets/css/calendar.css';
    document.head.appendChild(link);
  }

  a() {
    alert();
  }

  loadChart() {
    this.updateCalendar();

    const ctx = this.myChart.nativeElement.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Assistance', 'Delays '], //, 'Faltas'
        datasets: [
          {
            label: '',
            data: [this.asistencias.length, this.retardos.length],
            backgroundColor: [
              'rgba(8, 144, 0, 0.2)',
              'rgba(243, 156, 18, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(8, 144, 0, 1)',
              'rgba(243, 156, 18, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Checkin registration',
          },
        },
      },
    });
  }
}
