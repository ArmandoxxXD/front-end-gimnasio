import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProvedor'
})
export class FilterProvedorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg =='' || arg.length<3) return value;
    const resultadoProvedor=[];
    for(const provedor of value){
      if(provedor.nombreProvedor.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoProvedor.push(provedor);
      }
    }
    return resultadoProvedor;
  }

}
