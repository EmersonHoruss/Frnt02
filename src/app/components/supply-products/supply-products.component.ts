import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../services/support/msg.service';
import { ProductService } from '../../../services/product-management/product/product/product.service';
import { SupportService } from 'src/services/support/support.service';

@Component({
  selector: 'app-supply-products',
  templateUrl: './supply-products.component.html',
  styleUrls: ['./supply-products.component.css'],
})
export class SupplyProductsComponent implements OnInit {
  _products = [];
  _productsInTable = [];
  _suminister = {
    _amount: { _value: '', _error: false, _content: '' },
    _stock: { _value: '', _error: false, _content: '' },
  };
  _productsColumn = ['_category', '_brand', '_size', '_price', '_amount'];
  _productIndex: number[] = [];
  _productSelected: any[] = [];

  // INPUTS
  _search = '';
  _msg: any;
  constructor(
    private _modalS: NgbModal,
    private _msgS: MsgService,
    private _supportS: SupportService,
    private _productS: ProductService
  ) {
    this._getProductsInit();
  }

  _getProductsInit() {
    this._productS._readFull().subscribe((_products: any) => {
      // console.log(_products);
      const _productsInTable = _products.map((_product: any) => {
        const _costProduct = _product._price.filter(
          (_price: any) => _price._kindPrice._name.toLowerCase() === 'compra'
        );
        // console.log('COST PRODUCT', _costProduct);
        if (_costProduct.length === 0) _product._amount = '';
        else _product._amount = _costProduct[0]._amount;

        if (!_product._stock) _product._stock = '';

        return _product;
      });

      this._products = _productsInTable;
      this._productsInTable = this._products;
      // console.log(_products);
      // console.log(this._productsInTable);
    });
  }

  ngOnInit(): void {}

  // INPUT START
  _matching(_string: string, _object: any) {
    const _stringLC = _string.toLowerCase();
    const _regExp = new RegExp(_stringLC);

    const _brandString = _object._brand._name.toLowerCase();
    const _categoryString = _object._category._name.toLowerCase();
    const _sizeString = _object._size._name.toLowerCase();
    let _amountString = '';
    _object._amount
      ? (_amountString = 's/ ' + this._returnFloatForm(_object._amount))
      : (_amountString = 'sin precio de compra');

    const _stockString = this._stockFormat(_object._stock);

    // console.log(_object._amount);
    return _regExp.test(_categoryString)
      ? true
      : _regExp.test(_brandString)
      ? true
      : _regExp.test(_sizeString)
      ? true
      : _regExp.test(_amountString)
      ? true
      : _regExp.test(_stockString)
      ? true
      : false;
  }

  _getProducts(_event: any) {
    this._resetLocalArea();
    const _string = _event.target.value;
    this._productsInTable = this._products.filter((e) => {
      return this._matching(_string, e);
    });
  }

  _validateAmount(_event: any) {
    const _result = this._supportS._price(_event);

    this._suminister._amount = _result;
    // console.log(this._suminister._amount);
  }

  _validateStock(_event: any) {
    const _result = this._supportS._numbers(_event);

    this._suminister._stock = _result;
    // console.log(this._suminister._stock);
  }

  _wrote1() {
    return this._suminister._stock._value.length !== 0 ||
      this._suminister._amount._value.length !== 0
      ? true
      : false;
  }

  _wrote() {
    return this._suminister._stock._value.length === 0 ||
      this._suminister._amount._value.length === 0
      ? {
          _error: true,
          _type: 'error',
          _detail: 'Cantidad y precio deben estar llenados.',
        }
      : {
          _error: false,
          _type: '',
          _detail: '',
        };
  }

  _no0() {
    return parseInt(this._suminister._stock._value) === 0 ||
      parseFloat(this._suminister._amount._value) === 0
      ? {
          _error: true,
          _type: 'error',
          _detail: 'La cantidad y el precio deben ser diferente de 0.',
        }
      : {
          _error: false,
          _type: '',
          _detail: '',
        };
  }

  _inputReady() {
    const _wrote = this._wrote();
    const _no0 = this._no0();

    return _wrote._error ? _wrote : _no0;
  }
  // INPUT END

  // SAVE START
  _resetLocalArea() {
    this._productIndex = [];
    this._productSelected = [];
    this._suminister = {
      _amount: { _value: '', _error: false, _content: '' },
      _stock: { _value: '', _error: false, _content: '' },
    };
  }

  _reset() {
    this._resetLocalArea();
    this._getProductsInit();
  }

  _hasErrors() {
    const _wrote1 = this._wrote1();
    const _inputReady = this._inputReady();
    const _productReady = this._productIndex.length === 0 ? false : true;

    if (!_wrote1 && !_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione producto(s) y agrege cantidad y precio.',
      };

    if (_inputReady._error) return _inputReady;

    if (!_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione productos.',
      };

    return {
      _error: false,
      _type: '',
      _detail: 'Agregación exitosa',
    };
  }

  _dataReadyToSend() {
    const _productIds: any = [];
    const _productStocks: any = [];
    const _stock = parseInt(this._suminister._stock._value);
    const _amount = parseFloat(this._suminister._amount._value);

    this._productSelected.forEach((e: any) => {
      _productIds.push(e._id);
      if (e._stock.length === 0) _productStocks.push(0);
      else _productStocks.push(e._stock);
    });

    return {
      _productIds,
      _productStocks,
      _stock,
      _amount,
    };
  }

  _save(_content: any, _contentSpinner: any) {
    // console.log(this._hasErrors());
    const _hasErrors = this._hasErrors();
    const _error = _hasErrors._error;
    if (!_error) {
      // this._priceS._createMultiple('')
      const _spinerRef = this._modalS.open(_contentSpinner, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
        keyboard: false,
        backdrop: 'static',
      });
      this._productS._createMultiple(this._dataReadyToSend()).subscribe((e) => {
        // update the products
        // this._getProductsInit();
        // this._getPricesInit();
        this._reset();
        _spinerRef.close();
        this._triggerModal(_content, _hasErrors, false);
      });
    } else {
      this._triggerModal(_content, _hasErrors, false);
    }
  }
  // SAVE END

  // OTHER FUNCTIONS START
  _highlight(_row: any, _i: number) {
    // console.log(_row);
    this._productIndex.includes(_i)
      ? this._removeHighlight(_row, _i)
      : this._addHighlight(_row, _i);
  }
  // if u dont assigned prices it should be bolded
  _bold(_row: any) {
    const _prices = _row._price.filter(
      (e: any) => e._kindPrice._name.toLowerCase() !== 'compra'
    );
    // console.log(_prices);
    // console.log(_row);
    return _prices.length === 0 ? true : false;
    // return _row._price
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
    return 'Asignar Productos a Sedes';
  }

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }

  _stockFormat(_stock: any): any {
    return _stock ? _stock : '0';
  }

  _priceFormat(_price: any): any {
    const _normal = ' S/ ' + this._returnFloatForm(_price);
    return _price ? _normal : 'sin precio de compra';
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
