import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToeken';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public setToken(token: any): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    location.reload();
  }

  public isLogged(): boolean {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
        if (roles.indexOf('ROLE_ADMIN') < 0) {
          return false;
        }
      return true;
    } else {
      return false
    }
  }

  public isInstructor(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_INSTRUCTOR') < 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
   
  }

  public isMantenimeinto(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_MANTENIMIENTO') < 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
   
  }

  public isRecepcionista(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_RECEPCIONISTA') < 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  
  public isUser(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_USER') < 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public getDatesUserName(): string {
    if (!this.isLogged()) {
      return '';
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values.sub;
  }

  public getDatesId(): number|null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values.id;
  }

  public getDatesRol(): string {
    if (!this.isLogged()) {
      return '';
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values.roles.join(', ');
  }
}
