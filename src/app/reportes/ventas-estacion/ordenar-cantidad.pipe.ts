import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarCantidad'
})
export class OrdenarCantidadPipe implements PipeTransform {

  arrayReturn = []
  transform(value: any): any {
    let aux;
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value.length-1; j++) {
          if(value[j].cantidad<value[j+1].cantidad){
            aux = value[j];
            value[j] = value[j+1];
            value[j+1] = aux;
          }

      }


    }
    return value

  }

}
