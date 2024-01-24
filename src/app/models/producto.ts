export class Producto {
  id!: number;
  nombreProducto: string;
  imagen: string;
  cantidad: number;
  precio: number;
  existencia!: boolean;
  porAgotarse!: boolean;
  nombreProvedor: string;
  categoria: string;
  tipo: string;
  codeBar: string;

  constructor(
    nombreProducto: string,
    imagen: string,
    cantidad: number,
    precio: number,
    nombreProvedor: string,
    categoria: string,
    tipo: string,
    codeBar: string
  ) {
    this.nombreProducto = nombreProducto;
    this.imagen = imagen;
    this.cantidad = cantidad;
    this.precio = precio;
    this.nombreProvedor = nombreProvedor;
    this.categoria = categoria;
    this.tipo = tipo;
    this.codeBar = codeBar;
  }
}

export interface Ventas {
  productos: Array<any>;
  tipoPago: String;
  fecha: Date;
  total: Number;
}

export interface ProductoVenta {
  nombre: String;
  cantidad: number;
}

export interface ProductoVentaData {
  nombre: String;
  cantidad: number;
  codeBar: String;
  img: String;
  total: Number;
}
