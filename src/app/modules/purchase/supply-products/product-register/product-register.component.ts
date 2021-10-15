import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../../../services/support/support.service';
import { ProductService } from '../../../../../services/product-management/product/product/product.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../../../services/support/msg.service';

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
    },
    _brand: {
      _name: '',
      _minLength: 3,
      _maxLength: 15,
      _msg: { _error: false, _content: '' },
    },
    _size: {
      _name: '',
      _minLength: 1,
      _maxLength: 5,
      _msg: { _error: false, _content: '' },
    },
    _stock: {
      _value: '',
      _minLength: 1,
      _maxLength: 3,
      _msg: { _error: false, _content: '' },
    },
    _manufactured: false,
    _price: {
      _amount: '',
      _minLength: 1,
      _maxLength: 3,
      _msg: { _error: false, _content: '' },
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
        'Ya existe el producto, no puede registrar algo que ya está registrado',
    },
    {
      _type: 'success',
      _detail: 'El producto ha sido registrado correctamente',
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
      _stock: parseInt(this._product._stock._value),
      _manufactured: false,
      _brand: this._product._brand._name,
      _category: this._product._category._name,
      _size: this._product._size._name,
      _price: parseInt(this._product._price._amount),
    };
  }

  // PART: SAVE
  _isPossibleToSave() {
    const _booleanCategory = this._product._category._name ? true : false;
    const _booleanSize = this._product._size._name ? true : false;
    const _booleanBrand = this._product._brand._name ? true : false;
    const _booleanStock =
      this._product._stock._value && parseInt(this._product._stock._value) !== 0
        ? true
        : false;
    const _booleanPrice =
      this._product._price._amount &&
      parseInt(this._product._price._amount) !== 0
        ? true
        : false;

    return (
      _booleanBrand &&
      _booleanCategory &&
      _booleanPrice &&
      _booleanSize &&
      _booleanStock &&
      _booleanPrice
    );
  }

  async _save(_content: any, _contentSpiner: any) {
    const _productToSave = this._formatProductToSave();
    this._isPossibleToSave();
    if (this._isPossibleToSave()) {
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
      this._triggerModal(_content, this._listMsg[0]);
    }
  }

  //PART: ASSIGN VALUES TO PRODUCT
  // CATEGORY
  _assignCategory(_event: any) {
    if (!this._product._category._msg._error) {
      const _value = _event.target.value;
      this._product._category._name = _value;
    }
  }

  // BRAND
  _assignBrand(_event: any) {
    if (!this._product._brand._msg._error) {
      const _value = _event.target.value;
      this._product._brand._name = _value;
    }
  }

  // SIZE
  _assignSize(_event: any) {
    if (!this._product._size._msg._error) {
      const _value = _event.target.value;
      this._product._size._name = _value;
    }
  }

  // STOCK
  _assignStock(_event: any) {
    if (!this._product._stock._msg._error) {
      const _value = _event.target.value;
      this._product._stock._value = _value;
    }
  }

  // PRICE
  _assignPrice(_event: any) {
    if (!this._product._price._msg._error) {
      const _value = _event.target.value;
      this._product._price._amount = _value;
    }
  }

  // PART: VALIDATIONS INPUTS (CRITERIA OF ACCEPTANCE)
  // CATEGORY
  _validateCategory(_event: any) {
    const _msg = this._supportS._lowerCaseLetterAndSpace(_event);
    this._product._category._msg._error = _msg._error;
    this._product._category._msg._content = _msg._content;

    this._assignCategory(_event);
  }

  // BRAND
  _validateBrand(_event: any) {
    const _msg = this._supportS.justLowerCaseLetters(_event);
    this._product._brand._msg._error = _msg._error;
    this._product._brand._msg._content = _msg._content;

    this._assignBrand(_event);
  }

  // SIZE
  _validateSize(_event: any) {
    const _msg = this._supportS._validateSizeProduct(_event);
    this._product._size._msg._error = _msg._error;
    this._product._size._msg._content = _msg._content;

    this._assignSize(_event);
  }

  // STOCK
  _validateStock(_event: any) {
    const _msg = this._supportS._naturalNumberNo0(_event);
    this._product._stock._msg._error = _msg._error;
    this._product._stock._msg._content = _msg._content;

    this._assignStock(_event);
  }

  // PRICE
  _validatePrice(_event: any) {
    const _msg = this._supportS._naturalNumberNo0(_event);
    this._product._price._msg._error = _msg._error;
    this._product._price._msg._content = _msg._content;

    this._assignPrice(_event);
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
