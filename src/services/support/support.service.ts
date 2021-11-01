import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  _avatar = 'assets/img/hombre1.png';
  _idUser = '';
  // _avatarName = 'David Emerson Perales';
  _nickname = localStorage.getItem('_nickname');
  _kindUser = localStorage.getItem('_kindUser');
  constructor() {}

  _getKindUser() {
    return this._kindUser === 'owner'
      ? 'Dueño'
      : this._kindUser === 'seller'
      ? 'Vendedor'
      : this._kindUser === 'debt-collector'
      ? 'Cobrador'
      : '';
  }

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
        _value: event.target.value,
        _error: true,
        _content: 'Ingresar números del 0 al 9. Primer número no debe ser 0',
      };
    }

    const _patternFirstChar = /^0$/;
    const _valueFirstChar = event.target.value;
    if (_patternFirstChar.test(_valueFirstChar)) {
      event.target.value = _valueFirstChar.replace(/0/, '');
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Ingresar números del 0 al 9. Primer número no debe ser 0',
      };
    }

    return { _value: event.target.value, _error: false, _content: '' };
  }

  _validateSizeProduct(event: any): any {
    const pattern = /^[A-Za-zñáéíóúñÑ0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(
        /[^A-Za-zñáéíóúñÑ0-9]/g,
        ''
      );
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Solo puede ingresar letras y números',
      };
    }
    return { _value: event.target.value, _error: false, _content: '' };
  }

  // justLowerCaseLetters(event: any): any {
  _letters(event: any): any {
    const pattern = /^[A-ZÑa-zñáéíóú]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-ZÑa-zñáéíóú]/g, '');
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Solo puede ingresar letras',
      };
    }
    return { _value: event.target.value, _error: false, _content: '' };
  }

  // _lowerCaseLetterAndSpace(event: any): any {
  _letterAndSpace(event: any): any {
    const pattern = /^[a-zA-ZÑñáéíóú\s]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(
        /[^a-zA-ZÑñáéíóú\s]/g,
        ''
      );
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Solo puede ingresar letras y espacios en blanco',
      };
    }
    return { _value: event.target.value, _error: false, _content: '' };
  }

  // _replace(_string:string,_patter:){}

  // Return _msg interface three last functions

  _numbers(event: any): any {
    const _patternNumber = /^[0-9]*$/;
    const _valueNumber = event.target.value;
    if (!_patternNumber.test(_valueNumber)) {
      event.target.value = _valueNumber.replace(/[^0-9]/g, '');
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Solo puede ingresar números.',
      };
    }

    return { _value: event.target.value, _error: false, _content: '' };
  }

  _RUC(event: any): any {
    const _patternNumber = /^[0-9]*$/;
    // const _patternNumber = /^[0-9]}$/;
    const _valueNumber = event.target.value;
    if (!_patternNumber.test(_valueNumber)) {
      event.target.value = _valueNumber.replace(/[^0-9]/g, '');
      return {
        _value: event.target.value,
        _error: true,
        _content:
          'Debe ser un número con 11 digitos. Puede omitir el RUC si no es necesario',
      };
    }

    return { _value: event.target.value, _error: false, _content: '' };
  }

  _cel(event: any): any {
    const _patternNumber = /^[0-9]*$/;
    // const _patternNumber = /^[0-9]}$/;
    const _valueNumber = event.target.value;
    if (!_patternNumber.test(_valueNumber)) {
      event.target.value = _valueNumber.replace(/[^0-9]/g, '');
      return {
        _value: event.target.value,
        _error: true,
        _content:
          'Debe ser un número con 9 digitos. Puede omitir el celular si no es necesario',
      };
    }

    return { _value: event.target.value, _error: false, _content: '' };
  }

  _price(event: any): any {
    const _patternNumber = /^[0-9.]*$/;
    const _valueNumber = event.target.value;
    if (!_patternNumber.test(_valueNumber)) {
      // console.log('error');
      event.target.value = _valueNumber.replace(/[^0-9.]/g, '');
      return {
        _value: event.target.value,
        _error: true,
        _content: 'Números enteros o decimal positivo',
      };
    }
    // console.log('no error');
    return { _value: event.target.value, _error: false, _content: '' };
  }
}
