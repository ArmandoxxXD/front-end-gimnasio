export class Proveedor {
    id!: number;
    nombreProvedor:string;
    telefono: string;
    email:string;
    logo: File;
    pais:string;
    estado:string;
    municipio: string;
    calle: string;

    constructor(nombreProvedor:string,telefono:string,email:string,logo:File,pais:string,estado:string,municipio:string,calle:string){
        this.nombreProvedor=nombreProvedor;
        this.telefono=telefono;
        this.email=email;
        this.logo=logo;
        this.pais=pais;
        this.estado=estado;
        this.municipio=municipio;
        this.calle=calle;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreProvedor', this.nombreProvedor ? this.nombreProvedor.toString() : '');
        formData.append('telefono', this.telefono ? this.telefono.toString() : '');
        formData.append('email', this.email ? this.email.toString() : '');
        if (this.logo instanceof File) {
            formData.append('logo', this.logo);
        }
        formData.append('pais', this.pais ? this.pais.toString() : '');
        formData.append('estado', this.estado ? this.estado.toString() : '');
        formData.append('municipio', this.municipio ? this.municipio.toString() : '');
        formData.append('calle', this.calle ? this.calle.toString() : '');
        return formData;
    }    
}


export class EditProveedor {
    id!: number;
    nombreProvedor:string;
    telefono: string;
    email:string;
    logo: File;
    pais:string;
    estado:string;
    municipio: string;
    calle: string;
    borrarFoto:boolean=false;

    constructor(nombreProvedor:string,telefono:string,email:string,logo:File,pais:string,estado:string,municipio:string,calle:string,borrarFoto:boolean){
        this.nombreProvedor=nombreProvedor;
        this.telefono=telefono;
        this.email=email;
        this.logo=logo;
        this.pais=pais;
        this.estado=estado;
        this.municipio=municipio;
        this.calle=calle;
        this.borrarFoto=borrarFoto;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreProvedor', this.nombreProvedor ? this.nombreProvedor.toString() : '');
        formData.append('telefono', this.telefono ? this.telefono.toString() : '');
        formData.append('email', this.email ? this.email.toString() : '');
        if (this.logo instanceof File) {
            formData.append('logo', this.logo);
        }
        formData.append('pais', this.pais ? this.pais.toString() : '');
        formData.append('estado', this.estado ? this.estado.toString() : '');
        formData.append('municipio', this.municipio ? this.municipio.toString() : '');
        formData.append('calle', this.calle ? this.calle.toString() : '');
        formData.append('borrarFoto', this.borrarFoto.toString());
        return formData;
    }    
}