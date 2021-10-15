import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(_value: unknown): unknown {
    return _value + ' S/';
  }

}
