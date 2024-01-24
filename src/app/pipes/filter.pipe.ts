import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: string): any{
    //if (filtroActivado == true) {
    if(arg =='' || arg.length<3) return value;
    const resultadoProductos=[];
    for(const producto of value){
      if(producto.nombreProducto.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoProductos.push(producto);
      }else if(producto.nombreProvedor.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoProductos.push(producto);
      }
    }
    return resultadoProductos ;
  /*}else{
    return value;
  }*/
}
}
