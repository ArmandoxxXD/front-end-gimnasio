import { Optional } from "@angular/core";

export class CreateUser {

    id!: number;
    nombreUsuario: String;
    foto:File;
    edad: number;
    sueldo: number;
    turno: String;
    email: String;
    telefono: String;
    password: String;
    roles: Optional ;

    constructor(nombreUsuario: String,foto:File,edad: number,sueldo: number,turno: String,email: String,telefono:String ,password: String, roles:Optional ){
        this.nombreUsuario=nombreUsuario;
        this.foto=foto;
        this.edad=edad;
        this.sueldo=sueldo;
        this.turno=turno;
        this.email=email;
        this.telefono=telefono;
        this.password=password;
        this.roles=roles;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreUsuario', this.nombreUsuario ? this.nombreUsuario.toString() : '');
        formData.append('foto', this.foto ? this.foto : new File([], ""));
        formData.append('edad', this.edad ? this.edad.toString() : '');
        formData.append('sueldo', this.sueldo ? this.sueldo.toString() : '');
        formData.append('turno', this.turno ? this.turno.toString() : '');
        formData.append('email', this.email ? this.email.toString() : '');
        formData.append('telefono', this.telefono ? this.telefono.toString() : '');
        formData.append('password', this.password ? this.password.toString() : '');
        if (this.roles) {
            formData.append('roles', this.roles.toString());
        }
        return formData;
    }    
}


export class EditUser {

    id!: number;
    nombreUsuario: String;
    foto:File;
    edad: number;
    sueldo: number;
    turno: String;
    email: String;
    telefono: String;
    roles: Optional ;

    constructor(nombreUsuario: String,foto:File,edad: number,sueldo: number,turno: String,email: String,telefono:String, roles:Optional ){
        this.nombreUsuario=nombreUsuario;
        this.foto=foto;
        this.edad=edad;
        this.sueldo=sueldo;
        this.turno=turno;
        this.email=email;
        this.telefono=telefono;
        this.roles=roles;
    }

    toFormData(): FormData {
        const formData = new FormData();
        formData.append('nombreUsuario', this.nombreUsuario ? this.nombreUsuario.toString() : '');
        formData.append('foto', this.foto ? this.foto : new File([], ""));
        formData.append('edad', this.edad ? this.edad.toString() : '');
        formData.append('sueldo', this.sueldo ? this.sueldo.toString() : '');
        formData.append('turno', this.turno ? this.turno.toString() : '');
        formData.append('email', this.email ? this.email.toString() : '');
        formData.append('telefono', this.telefono ? this.telefono.toString() : '');
        if (this.roles) {
            formData.append('roles', this.roles.toString());
        }
        return formData;
    }    
}


export class EditPassword {
    currentPassword: String;
    newPassword:String;
    

    constructor(currentPassword: String,newPassword:String){
        this.currentPassword=currentPassword;
        this.newPassword=newPassword;
    }
}
