import { Optional } from "@angular/core";

export class CreateCliente {

    id!: number;
    nombreUsuario: string;
    // foto:string ;
    edad: number;
    email: string;
    telefono: string;
    password: string;
    roles: Optional ;

    constructor(nombreUsuario: string,edad: number,email: string,telefono:string ,password: string, roles:Optional ){
        this.nombreUsuario=nombreUsuario;
        this.edad=edad;
        this.email=email;
        this.telefono=telefono;
        this.password=password;
        this.roles=roles;
    }
}
