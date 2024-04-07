import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationPush } from '../models/notificationPush';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountExpirationService {
  private timerId: any;
  private countdownId: any;
  private readonly inactivityTime = 1 * 60 * 1000; // 1 min y 30 segundos de tiempo permitido de inactividad 
  private isCountdownShown = false;
  private inactivitySwalVisible = false;

  constructor(private token: TokenService, private router: Router, private authService: AuthService) { 
    if (!this.token.isLogged()) {
      return; // Si el usuario no ha iniciado sesión, no hagas nada
    }
    this.resetTimer();
    this.addActivityListeners();
  }

  private addActivityListeners(): void {
    document.addEventListener('mousemove', () => {
      if (!this.isCountdownShown) {
        this.resetTimer();
      }
    });
    document.addEventListener('keypress', () => this.resetTimer());
  }

  public resetTimer(): void {
    clearTimeout(this.timerId);
    clearTimeout(this.countdownId);
    if (this.inactivitySwalVisible) { // Solo cierra SweetAlert si el de inactividad está visible
      Swal.close();
      this.inactivitySwalVisible = false; // Marca que el SweetAlert de inactividad ya no está visible
    }

    this.timerId = setTimeout(() => this.showCountdown(), this.inactivityTime);
  }

  private showCountdown(): void {
    let counter = 0.5 * 60; // 30 segundos countdown
    if (this.isCountdownShown) return;
    this.isCountdownShown = true;
    this.inactivitySwalVisible = true;
    const notificationDto: NotificationPush = { title: 'Session Expired', body: 'Your session will expire in 30 seconds due to inactivity.' };
    this.sendNotification(notificationDto);
    Swal.fire({
      title: 'You are about to be logged out due to inactivity!',
      html: 'You will be signed out in <b></b> seconds.',
      timer: counter * 1000,
      didOpen: () => {
        Swal.showLoading();
        const content = Swal.getHtmlContainer();
        const b = content!.querySelector('b');
        this.countdownId = setInterval(() => {
          counter--;
          if (b) {
            b.textContent = String(counter);
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(this.countdownId);
        this.isCountdownShown = false;
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        const notificationDto: NotificationPush = { title: 'Session Expired', body: 'Your session has been closed due to inactivity.' };
        this.sendNotification(notificationDto);
        this.token.logOut();
        this.router.navigate(['/home']);
      }
    });
  }

  sendNotification(notificationDto:NotificationPush){
    this.authService.pushNotifications(this.token.getDatesId(), notificationDto).subscribe(
      {
        next: (response) => {
        },
        error: (error) => {
          console.error('Error sending notification', error);
        }
      }
    );
  }
}
