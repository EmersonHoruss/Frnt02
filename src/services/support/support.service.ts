import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  _avatar = 'assets/img/hombre1.png';
  _avatarName = 'David Emerson Perales';
  _idUser = '';

  constructor() {}

  // VALIDATING FORMS
  // root
  // inputValidator(event: any) {
  //   //console.log(event.target.value);
  //   const pattern = /^[a-zA-Z0-9]*$/;
  //   //let inputChar = String.fromCharCode(event.charCode)
  //   if (!pattern.test(event.target.value)) {
  //     event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
  //     // invalid character, prevent input
  //   }
  // }

  justNumbers(event: any) {
    const _pattern = /^[0-9]*$/;
    const _value = event.target.value;
    if (!_pattern.test(_value)) {
      event.target.value = _value.replace(/[^0-9]/g, '');
    }
  }

  //dosen't let to write
  no0InStringLenght1(event: any) {
    const _pattern = /^0$/;
    const _value = event.target.value;
    if (_pattern.test(_value)) {
      event.target.value = _value.replace(/0/, '');
    }
  }

  naturalNumberNo0(event: any) {
    this.justNumbers(event);
    this.no0InStringLenght1(event);
  }

  justNumbersxd(event: any) {
    const _pattern = /^[0-9]*?\.?[0-9]*$/;
    const _value = event.target.value;
    console.log(_pattern.test(_value));
  }

  realNumberNoNegative(event: any) {}

  validateDNI(event: any, n: number) {
    this.justNumbers(event);
    const pattern = /^[0000000]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    // if (!pattern.test(event.target.value)) {
    //   event.target.value = event.target.value.replace(/[^0000000]/g, '');
    //   // invalid character, prevent input
    // }
  }

  justLetters(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-ZñÑáéíóú]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-ZñÑáéíóú]/g, '');
      // invalid character, prevent input
    }
  }

  justNumbersNo0(event: any): any {
    const pattern = /^[1-9][]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      return {
        _error: true,
        _content:
          'Ingresar números del 0 al 9. Primer número debe ser diferente de 0',
      };
    }
    return { _error: false, _content: '' };
  }

  // WORKS WELL UPDATED SUPPORT SERVICE
  _naturalNumberNo0(event: any): any {
    const _patternNumber = /^[0-9]*$/;
    const _valueNumber = event.target.value;
    if (!_patternNumber.test(_valueNumber)) {
      event.target.value = _valueNumber.replace(/[^0-9]/g, '');
      return {
        _error: true,
        _content:
          'Ingresar números del 0 al 9. Primer número debe ser diferente de 0',
      };
    }

    const _patternFirstChar = /^0$/;
    const _valueFirstChar = event.target.value;
    if (_patternFirstChar.test(_valueFirstChar)) {
      event.target.value = _valueFirstChar.replace(/0/, '');
      return {
        _error: true,
        _content:
          'Ingresar números del 0 al 9. Primer número debe ser diferente de 0',
      };
    }

    return { _error: false, _content: '' };
  }

  _validateSizeProduct(event: any): any {
    const pattern = /^[A-ZÑ0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-ZÑ0-9]/g, '');
      return {
        _error: true,
        _content: 'Solo puede ingresar mayúsculas y números del 0 al 9',
      };
    }
    return { _error: false, _content: '' };
  }

  justLowerCaseLetters(event: any): any {
    const pattern = /^[a-zñáéíóú]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zñáéíóú]/g, '');
      return {
        _error: true,
        _content: 'Solo puede ingresar minúsculas',
      };
    }
    return { _error: false, _content: '' };
  }

  _lowerCaseLetterAndSpace(event: any): any {
    const pattern = /^[a-zñáéíóú\s]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zñáéíóú\s]/g, '');
      return {
        _error: true,
        _content: 'Solo puede ingresar minúsculas',
      };
    }
    return { _error: false, _content: '' };
  }

  // Return _msg interface three last functions
}
