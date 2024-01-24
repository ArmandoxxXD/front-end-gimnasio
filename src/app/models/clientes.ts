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

