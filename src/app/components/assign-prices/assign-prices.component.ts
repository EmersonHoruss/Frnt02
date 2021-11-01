import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../services/support/msg.service';
import { ProductService } from '../../../services/product-management/product/product/product.service';
import { _customerSupport } from '../../../services/customer-support/customer-support.keys';
import { KindPriceService } from '../../../services/product-management/price/kind-price/kind-price.service';
import { SupportService } from 'src/services/support/support.service';

@Component({
  selector: 'app-assign-prices',
  templateUrl: './assign-prices.component.html',
  styleUrls: ['./assign-prices.component.css'],
})
export class AssignPricesComponent implements OnInit {
  // TABLES
  // _products = [];
  _productsInTable = [];
  _prices = [];
  _productColumn = ['_category', '_brand', '_size', '_stock'];
  _priceColumn = ['_nameKindPrice', '_amountPrice'];
  _productIndex: number[] = [];
  _productSelected: any[] = [];
  _pricesToSend: any[] = [];

  // INPUTS
  _search = '';
  _msg: any;

  constructor(
    private _modalS: NgbModal,
    private _msgS: MsgService,
    private _supportS: SupportService,
    private _productS: ProductService,
    private _kindPriceS: KindPriceService
  ) {
    this._getProductsInit();
    this._getPricesInit();
  }

  _getProductsInit() {
    this._productS._readFull().subscribe((_products: any) => {
      // console.log(_products);
      this._productsInTable = _products.map((_product: any) => {
        const _costProduct = _product._price.filter(
          (_price: any) => _price._kindPrice._name.toLowerCase() === 'compra'
        );
        _product._amount = _costProduct[0]._amount;
        return _product;
      });
      // console.log(this._productsInTable);
    });
  }

  _getPricesInit() {
    this._kindPriceS._read().subscribe((e: any) => {
      this._prices = e.filter((e: any) => e._name.toLowerCase() !== 'compra');
      this._getSendPricesInit();
    });
  }

  _getSendPricesInit() {
    this._prices.forEach((e: any) => {
      this._pricesToSend.push({
        _namePrice: e._name,
        _idPrice: e._id,
        _value: '',
        _error: false,
        _content: '',
      });
    });
    // console.log(this._pricesToSend);
  }

  ngOnInit(): void {}

  // INPUT START
  _catchValue(_event: any, _index: number) {
    const _result = this._supportS._price(_event);
    // console.log(_result);
    this._pricesToSend[_index]._value = _result._value;
    this._pricesToSend[_index]._error = _result._error;
    this._pricesToSend[_index]._content = _result._content;
  }
  // Acceptance criteria
  _inputReady() {
    let _ready = true;
    this._pricesToSend.forEach((e: any) => {
      const _hasChars = e._value.length === 0 ? false : true;
      _ready = _ready && _hasChars;
    });
    return _ready;
  }
  // INPUT END

  // SAVE START
  _alreadyHasPrices(): boolean {
    const _filteredProducts = this._productSelected.filter((e: any) => {
      const _prices = e._price.filter(
        (e: any) => e._kindPrice._name.toLowerCase() !== 'compra'
      );
      return _prices.length === 0 ? false : true;
    });

    return _filteredProducts.length === 0 ? false : true;
  }

  // Acceptance criteria
  _hasErrors() {
    const _inputReady = this._inputReady();
    const _productReady = this._productIndex.length === 0 ? false : true;
    const _hasPrices = this._alreadyHasPrices();

    if (!_inputReady && !_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione producto(s) y luego ingrese todos los precios.',
      };

    if (_productReady && _hasPrices)
      return {
        _error: true,
        _type: 'error',
        _detail: 'No puede asignar el precio porque ya cuenta con precio.',
      };

    if (_inputReady && !_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione uno o más productos.',
      };

    if (!_inputReady && _productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Ingrese todos los precios.',
      };

    return {
      _error: false,
      _type: '',
      _detail: 'Asignación exitosa.',
    };
  }

  _save(_content: any, _contentSpiner: any) {
    const _hasErrors = this._hasErrors();
    if (!_hasErrors) {
      
    } else {
      this._triggerModal(_content, _hasErrors, false);
    }
  }
  // SAVE END
  // xd moche

  // OTHER FUNCTIONS START
  _highlight(_row: any, _i: number) {
    this._productIndex.includes(_i)
      ? this._removeHighlight(_row, _i)
      : this._addHighlight(_row, _i);
  }

  _addHighlight(_row: any, _i: number) {
    this._productIndex.push(_i);
    this._productSelected.push(_row);
  }

  _removeHighlight(_row: any, _i: number) {
    this._productIndex = this._productIndex.filter((e) => e !== _i);
    this._productSelected = this._productSelected.filter(
      (e: any) => JSON.stringify(e) !== JSON.stringify(_row)
    );
  }

  _getTitlePage() {
    return 'Asignar Precios a Productos';
  }

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }
  // OTHER FUNCTIONS END

  // PART MODAL START
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
  // PART MODAL END
}

// console.log('PRODUCTS INDEX: ', this._productIndex);
// console.log('PRODUCTS SELECTED:', this._productSelected);
// console.log('CATCHED VALUES: ', this._pricesToSend);
// console.log(this._inputReady());
// console.log(this._alreadyHasPrices());
