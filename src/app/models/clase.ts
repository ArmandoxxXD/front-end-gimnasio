export class Clase {

    id!:number;
    nombreClase:String;
    descripcion:String;
    costo:number;
    nombreInstructor:String;
    fecha:String;
    hora: String;
    cupo:number;
    fotoClase:String;

    constructor(
        nombreClase:String,
        descripcion:String,
        costo:number, 
        nombreInstructor:String,
        fecha:String,
        hora: String,
        cupo:number,
        fotoClase:String,
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

}
