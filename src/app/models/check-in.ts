export class CheckIn {
    
    idEmpleado: number;
    fecha: String;
    hora: String;
    tipo: String;
    estado: String;

    constructor(idEmpleado:number,fecha:String,hora:String,tipo:String, estado: String){
        this.idEmpleado=idEmpleado;
        this.fecha=fecha;
        this.hora=hora;
        this.tipo=tipo;
        this.estado=estado;
    }
}
