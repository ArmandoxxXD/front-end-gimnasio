export class JwtToken {
    token: String
    mensaje: string

    constructor(token: String,mensaje: string) {
        this.token=token;
        this.mensaje=mensaje;
    }
}
