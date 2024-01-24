import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClase'
})
export class FilterClasePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg =='' || arg.length<2) return value;
    const resultadoClase=[];
    for(const clase of value){
      if(clase.nombreClase.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoClase.push(clase);
      }
    }
    return resultadoClase;
  }

}
