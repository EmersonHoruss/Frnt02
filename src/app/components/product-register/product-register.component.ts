import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportService } from '../../../services/support/support.service';
import { MsgService } from '../../../services/support/msg.service';
import { ProductService } from '../../../services/product-management/product/product/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css'],
})
export class ProductRegisterComponent implements OnInit {
  _product = {
    _category: {
      _name: '',
      _minLength: 5,
      _maxLength: 30,
      _msg: { _error: false, _content: '' },
      _aCMinLength: {
        _error: false,
        _content: 'Debe tener como mínimo 5 caracteres.',
      },
      _exist: false,
    },
    _brand: {
      _name: '',
      _minLength: 3,
      _maxLength: 15,
      _msg: { _error: false, _content: '' },
      _aCMinLength: {
        _error: false,
        _content: 'Debe tener como mínimo 3 caracteres.',
      },
      _exist: false,
    },
    _size: {
      _name: '',
      _minLength: 1,
      _maxLength: 5,
      _msg: { _error: false, _content: '' },
      _aCMinLength: {
        _error: false,
        _content: 'Debe tener como mínimo 1 caracter.',
      },
      _exist: false,
    },
    _stock: {
      _value: '',
      _minLength: 1,
      _maxLength: 3,
      _msg: { _error: false, _content: '' },
      _aCMinLength: {
        _error: false,
        _content: 'Debe tener como mínimo 1 caracter.',
      },
      _exist: false,
    },
    _manufactured: false,
    _price: {
      _amount: '',
      _minLength: 1,
      _maxLength: 3,
      _msg: { _error: false, _content: '' },
      _aCMinLength: {
        _error: false,
        _content: 'Debe tener como mínimo 1 caracter.',
      },
      _exist: false,
    },
  };
  _closeResult = '';
  _msg: any;
  _listMsg = [
    {
      _type: 'error',
      _detail: 'El formulario está incompleto. Llene todos los espacios.',
    },
    {
      _type: 'error',
      _detail:
        'Tiene errores en el ingreso de datos, relacionados con la longitud mínima requerida',
    },
  ];

  constructor(
    private _supportS: SupportService,
    private _productS: ProductService,
    private _modalS: NgbModal,
    private _msgS: MsgService
  ) {}

  ngOnInit(): void {}

  // PART: PREPARE DATA TO SAVE
  _formatProductToSave(): any {
    return {
      // _stock: parseInt(this._product._stock._value),
      // _manufactured: false,
      _brand: this._product._brand._name,
      _category: this._product._category._name,
      _size: this._product._size._name,
      // _price: parseInt(this._product._price._amount),
    };
  }

  // PART: SAVE
  _inputsNotNull() {
    this._product._category._exist = this._product._category._name
      ? true
      : false;
    this._product._size._exist = this._product._size._name ? true : false;
    this._product._brand._exist = this._product._brand._name ? true : false;
    this._product._stock._exist =
      this._product._stock._value && parseInt(this._product._stock._value) !== 0
        ? true
        : false;
    this._product._price._exist =
      this._product._price._amount &&
      parseInt(this._product._price._amount) !== 0
        ? true
        : false;

    return (
      this._product._category._exist &&
      this._product._size._exist &&
      this._product._brand._exist 
      // &&
      // this._product._stock._exist &&
      // this._product._price._exist
    );
  }

  _inputSatisfyACMinLength() {
    return (
      !this._product._category._aCMinLength._error &&
      !this._product._size._aCMinLength._error &&
      !this._product._brand._aCMinLength._error 
      // &&
      // !this._product._stock._aCMinLength._error &&
      // !this._product._price._aCMinLength._error
    );
  }

  async _save(_content: any, _contentSpiner: any) {
    const _productToSave = this._formatProductToSave();
    this._inputsNotNull();
    if (this._inputsNotNull()) {
      if (this._inputSatisfyACMinLength()) {
        const _modalReference = this._modalS.open(_contentSpiner, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'sm',
          keyboard: false,
          backdrop: 'static',
        });
        await this._productS
          ._createWithNoId(_productToSave)
          .then((e) => {
            console.log(e);
            _modalReference.close();
            this._triggerModal(_content, e);
          })
          .catch((e) => {
            console.log(e.error);
            _modalReference.close();
            this._triggerModal(_content, e.error);
          });
      } else {
        this._triggerModal(_content, this._listMsg[1]);
      }
    } else {
      this._triggerModal(_content, this._listMsg[0]);
    }
    // console.log(this._product, this._inputsNotNull());
  }

  // PART: VALIDATIONS INPUTS (CRITERIA OF ACCEPTANCE CHARS AVAILABLE)
  // CATEGORY
  _validateCategory(_event: any) {
    const _msg = this._supportS._letterAndSpace(_event);
    this._product._category._msg._error = _msg._error;
    this._product._category._msg._content = _msg._content;
    this._product._category._name = _msg._value;
    this._aCLengthCategory();
  }

  // BRAND
  _validateBrand(_event: any) {
    const _msg = this._supportS._letters(_event);
    this._product._brand._msg._error = _msg._error;
    this._product._brand._msg._content = _msg._content;
    this._product._brand._name = _msg._value;
    this._aCLengthBrand();
  }

  // SIZE
  _validateSize(_event: any) {
    const _msg = this._supportS._validateSizeProduct(_event);
    this._product._size._msg._error = _msg._error;
    this._product._size._msg._content = _msg._content;
    this._product._size._name = _msg._value;
    this._aCLengthSize();
  }

  // STOCK
  _validateStock(_event: any) {
    const _msg = this._supportS._naturalNumberNo0(_event);
    this._product._stock._msg._error = _msg._error;
    this._product._stock._msg._content = _msg._content;
    this._product._stock._value = _msg._value;
    this._aCLengthStock();
  }

  // PRICE
  _validatePrice(_event: any) {
    const _msg = this._supportS._naturalNumberNo0(_event);
    this._product._price._msg._error = _msg._error;
    this._product._price._msg._content = _msg._content;
    this._product._price._amount = _msg._value;
    this._aCLengthPrice();
  }

  // PART: VALIDATIONS INPUTS (CRITERIA OF ACCEPTANCE MIN LENGTH)
  // CATEGORY
  _aCLengthCategory() {
    this._product._category._name.length < this._product._category._minLength
      ? (this._product._category._aCMinLength._error = true)
      : (this._product._category._aCMinLength._error = false);
  }

  // BRAND
  _aCLengthBrand() {
    this._product._brand._name.length < this._product._brand._minLength
      ? (this._product._brand._aCMinLength._error = true)
      : (this._product._brand._aCMinLength._error = false);
  }

  // SIZE
  _aCLengthSize() {
    this._product._size._name.length < this._product._size._minLength
      ? (this._product._size._aCMinLength._error = true)
      : (this._product._size._aCMinLength._error = false);
  }

  // STOCK
  _aCLengthStock() {
    this._product._stock._value.length < this._product._stock._minLength
      ? (this._product._stock._aCMinLength._error = true)
      : (this._product._stock._aCMinLength._error = false);
  }

  // PRICE
  _aCLengthPrice() {
    this._product._price._amount.length < this._product._price._minLength
      ? (this._product._price._aCMinLength._error = true)
      : (this._product._price._aCMinLength._error = false);
  }

  // PART: RESET PRODUCT
  _resetProduct() {}

  // PART: MODAL
  _openModal(_content: any, _lock: boolean) {
    _lock
      ? this._modalS.open(_content, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'sm',
          keyboard: false,
          backdrop: 'static',
        })
      : this._modalS.open(_content, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'sm',
        });
  }

  _triggerModal(_content: any, _specificMsg: any, _lock = true) {
    this._msgS._setMsg(_specificMsg);
    this._msg = this._msgS._getMsg();
    this._openModal(_content, _lock);
  }
}
