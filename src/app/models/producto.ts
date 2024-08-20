export class Producto {
  id!: number;
  nombreProducto: string;
  imagen: File;
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
    imagen: File,
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

  toFormData(): FormData {
    const formData = new FormData();
    formData.append('nombreProducto', this.nombreProducto ? this.nombreProducto.toString() : '');
    if (this.imagen instanceof File) {
      formData.append('imagen', this.imagen);
  }
    formData.append('cantidad', this.cantidad ? this.cantidad.toString() : '');
    formData.append('precio', this.precio ? this.precio.toString() : '');
    formData.append('nombreProvedor', this.nombreProvedor ? this.nombreProvedor.toString() : '');
    formData.append('categoria', this.categoria ? this.categoria.toString() : '');
    formData.append('tipo', this.tipo ? this.tipo.toString() : '');
    formData.append('codeBar', this.codeBar ? this.codeBar.toString() : '');
    return formData;
}    
}

export class EditProducto {
  id!: number;
  nombreProducto: string;
  imagen: File;
  cantidad: number;
  precio: number;
  existencia!: boolean;
  porAgotarse!: boolean;
  nombreProvedor: string;
  categoria: string;
  tipo: string;
  codeBar: string;
  borrarFoto:boolean=false;

  constructor(
    nombreProducto: string,
    imagen: File,
    cantidad: number,
    precio: number,
    nombreProvedor: string,
    categoria: string,
    tipo: string,
    codeBar: string,
    borrarFoto:boolean
  ) {
    this.nombreProducto = nombreProducto;
    this.imagen = imagen;
    this.cantidad = cantidad;
    this.precio = precio;
    this.nombreProvedor = nombreProvedor;
    this.categoria = categoria;
    this.tipo = tipo;
    this.codeBar = codeBar;
    this.borrarFoto=borrarFoto;
  }

  toFormData(): FormData {
    const formData = new FormData();
    formData.append('nombreProducto', this.nombreProducto ? this.nombreProducto.toString() : '');
    if (this.imagen instanceof File) {
      formData.append('imagen', this.imagen);
  }
    formData.append('cantidad', this.cantidad ? this.cantidad.toString() : '');
    formData.append('precio', this.precio ? this.precio.toString() : '');
    formData.append('nombreProvedor', this.nombreProvedor ? this.nombreProvedor.toString() : '');
    formData.append('categoria', this.categoria ? this.categoria.toString() : '');
    formData.append('tipo', this.tipo ? this.tipo.toString() : '');
    formData.append('codeBar', this.codeBar ? this.codeBar.toString() : '');
    formData.append('borrarFoto', this.borrarFoto.toString());
    return formData;
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
