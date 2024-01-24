import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(value: any, filtertring: string) {
    if (value.length === 0 || filtertring === '') {
      return value;
    }
    const clases = [];

    for (const clase of value) {
      if (clase['Fecha'] === filtertring) {
        clases.push(clase);
      }
    }
    return clases;
  }
}
