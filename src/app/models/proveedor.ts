export class Proveedor {
    id!: number;
    nombreProvedor:string;
    telefono: string;
    email:string;
    logo: string;
    pais:string;
    estado:string;
    municipio: string;
    calle: string;

    constructor( nombreProvedor:string,telefono:string,email:string,logo:string,pais:string,estado:string,municipio:string,calle:string){
        this.nombreProvedor=nombreProvedor;
        this.telefono=telefono;
        this.email=email;
        this.logo=logo;
        this.pais=pais;
        this.estado=estado;
        this.municipio=municipio;
        this.calle=calle;
    }

}
