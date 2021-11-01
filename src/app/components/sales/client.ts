import { SupportService } from '../../../services/support/support.service';

export class Client {
  getClient() {
    const _supportS = new SupportService();
    return {
      _name: {
        _name: '',
        _minLength: 1,
        _maxLength: 40,
        _required: true,
        _typeData: ['blank space', 'letter'],
        _errors: {
          // _maxLength: {
          //   _error: false,
          //   _content: 'Solo puede tener 40 caracter.',
          // },
          _required: {
            _error: false,
            _content: 'Es necesario que ingrese el nombre.',
          },
          _typeData: {
            _error: false,
            _content: 'Solo puede ingresar letras, espacios en blanco.',
            _function: _supportS._letterAndSpace,
          },
        },
        _exist: false,
      },
      _DNI: {
        _name: '',
        _minLength: 8,
        _maxLength: 8,
        _required: true,
        _typeData: ['number'],
        _errors: {
          // _maxLength: {
          //   _error: false,
          //   _content: 'Solo puede tener 8 caracteres.',
          // },
          _required: {
            _error: false,
            _content: 'Es necesario que ingrese el DNI(8 dígitos).',
          },
          _typeData: {
            _error: false,
            _content: 'Solo puede ingresar números.',
            _function: _supportS._numbers,
          },
        },
        _exist: false,
      },
      _RUC: {
        _name: '',
        _minLength: 11,
        _maxLength: 11,
        _required: false,
        _typeData: ['number'],
        _errors: {
          // _maxLength: {
          //   _error: false,
          //   _content: 'Solo puede tener 11 caracteres.',
          // },
          _typeData: {
            _error: false,
            _content: 'Solo puede ingresar números.',
            _function: _supportS._RUC,
          },
        },
        _exist: false,
      },
      _cel: {
        _name: '',
        _minLength: 9,
        _maxLength: 9,
        _required: false,
        _typeData: ['number'],
        _errors: {
          // _maxLength: {
          //   _error: false,
          //   _content: 'Solo puede tener 9 caracteres',
          // },
          _typeData: {
            _error: false,
            _content: 'Solo puede ingresar números.',
            _function: _supportS._cel,
          },
        },
        _exist: false,
      },
    };
  }
}
