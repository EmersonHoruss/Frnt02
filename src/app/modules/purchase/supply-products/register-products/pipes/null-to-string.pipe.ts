import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToString',
})
export class NullToStringPipe implements PipeTransform {
  transform(_value: any, _type: string, _allAreSelected: boolean): any {
    let _returnedValue = '';
    const _part1 = 'no tiene ';
    const _part2 = '(producto nuevo)';
    const _partJoin = _part1 + _type + _part2;

    return !_allAreSelected
      ? ''
      : !_value
      ? _partJoin
      : _type === 'costo'
      ? _value + ' S/'
      : _value;
  }
}
