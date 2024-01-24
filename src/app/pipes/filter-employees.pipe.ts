import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployees',
})
export class FilterEmployeesPipe implements PipeTransform {
  /*
  El método transform recibe dos parámetros: value es la lista de elementos
  que se van a filtrar y arg es el texto de búsqueda.
  */
  transform(value: any, arg: any): any {
    const result = []; // Se inicializa una lista vacía resultPlaces que almacenará los elementos que coincidan con el texto de búsqueda.
    // Se itera sobre cada elemento de la lista de elementos.
    for (const empleado of value) {
      /* Se verifica si el nombre del elemento incluye el texto de búsqueda.
      El método toLowerCase() convierte ambos textos a minúsculas para hacer
      una comparación sin distinción entre mayúsculas y minúsculas.
      Si el índice es mayor que -1, significa que se encontró el texto de búsqueda y
      se agrega el elemento a la lista resultPlaces.*/
      if (
        empleado.nombreUsuario.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        result.push(empleado);
      }
    }
    // Se retorna la lista de elementos que coinciden con el texto de búsqueda.
    return result;
  }
}
