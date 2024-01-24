import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCliente'
})
export class FilterClientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg =='' || arg.length<3) return value;
    const resultadoCliente=[];
    for(const cliente of value){
      if(cliente.nombreCliente.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoCliente.push(cliente);
      }else if(cliente.email.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoCliente.push(cliente);
      }
    }
    return resultadoCliente;
  }

}
