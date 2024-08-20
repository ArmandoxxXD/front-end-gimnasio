export class Clase {

    id!:number;
    nombreClase:String;
    descripcion:String;
    costo:number;
    nombreInstructor:String;
    fecha:String;
    hora: String;
    cupo:number;
    fotoClase:File;

    constructor(
        nombreClase:String,
        descripcion:String,
        costo:number, 
        nombreInstructor:String,
        fecha:String,
        hora: String,
        cupo:number,
        fotoClase:File,
        )
    {
        this.nombreClase=nombreClase;
        this.descripcion=descripcion;
        this.costo=costo;
        this.nombreInstructor=nombreInstructor;
        this.fecha=fecha;
        this.hora=hora;
        this.cupo=cupo;
        this.fotoClase=fotoClase;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreClase', this.nombreClase ? this.nombreClase.toString() : '');
        formData.append('descripcion', this.descripcion ? this.descripcion.toString() : '');
        formData.append('costo', this.costo ? this.costo.toString() : '');
        formData.append('nombreInstructor', this.nombreInstructor ? this.nombreInstructor.toString() : '');
        formData.append('fecha', this.fecha ? this.fecha.toString() : '');
        formData.append('hora', this.hora ? this.hora.toString() : '');
        formData.append('cupo', this.cupo ? this.cupo.toString() : '');
        if (this.fotoClase instanceof File) {
            formData.append('fotoClase', this.fotoClase);
        }
        return formData;
    }  
}

export class EditClase {

    id!:number;
    nombreClase:String;
    descripcion:String;
    costo:number;
    nombreInstructor:String;
    fecha:String;
    hora: String;
    cupo:number;
    fotoClase:File;
    borrarFoto:boolean=false;

    constructor(
        nombreClase:String,
        descripcion:String,
        costo:number, 
        nombreInstructor:String,
        fecha:String,
        hora: String,
        cupo:number,
        fotoClase:File,
        borrarFoto:boolean
        )
    {
        this.nombreClase=nombreClase;
        this.descripcion=descripcion;
        this.costo=costo;
        this.nombreInstructor=nombreInstructor;
        this.fecha=fecha;
        this.hora=hora;
        this.cupo=cupo;
        this.fotoClase=fotoClase;
        this.borrarFoto=borrarFoto;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreClase', this.nombreClase ? this.nombreClase.toString() : '');
        formData.append('descripcion', this.descripcion ? this.descripcion.toString() : '');
        formData.append('costo', this.costo ? this.costo.toString() : '');
        formData.append('nombreInstructor', this.nombreInstructor ? this.nombreInstructor.toString() : '');
        formData.append('fecha', this.fecha ? this.fecha.toString() : '');
        formData.append('hora', this.hora ? this.hora.toString() : '');
        formData.append('cupo', this.cupo ? this.cupo.toString() : '');
        if (this.fotoClase instanceof File) {
            formData.append('fotoClase', this.fotoClase);
        }
        formData.append('borrarFoto', this.borrarFoto.toString());
        return formData;
    }  
}
