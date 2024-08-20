import { Optional } from "@angular/core";

export class Clientes {
    id!: number;
    nombreCliente: String;
    nombreClase: String[];
    edad: number
    email: String;
    telefono: String;
    subcripcion: number;
    totalPagarAlMes!: number;


    constructor(nombreCliente:String,nombreClase:String[],edad:number,email: String,telefono: String,subcripcion: number){
        this.nombreCliente=nombreCliente;
        this.nombreClase=nombreClase;
        this.edad=edad;
        this.email=email;
        this.telefono=telefono;
        this.subcripcion=subcripcion;
    }
    
}

export class CreateCliente {

    id!: number;
    nombreUsuario: string;
    edad: number;
    email: string;
    telefono: string;
    password: string;
    roles: Optional ;

    constructor(nombreUsuario: string,edad: number, email: string,telefono:string ,password: string, roles:Optional ){
        this.nombreUsuario=nombreUsuario;
        this.edad=edad;
        this.email=email;
        this.telefono=telefono;
        this.password=password;
        this.roles=roles;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreUsuario', this.nombreUsuario ? this.nombreUsuario.toString() : '');
        formData.append('edad', this.edad ? this.edad.toString() : '');
        formData.append('email', this.email ? this.email.toString() : '');
        formData.append('telefono', this.telefono ? this.telefono.toString() : '');
        formData.append('password', this.password ? this.password.toString() : '');
        if (this.roles) {
            formData.append('roles', this.roles.toString());
        }
        return formData;
    }   
}

