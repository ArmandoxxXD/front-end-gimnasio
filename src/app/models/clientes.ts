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
