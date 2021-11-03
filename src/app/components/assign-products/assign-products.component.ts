import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../services/support/msg.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product-management/product/product/product.service';
import { HeadquarterService } from '../../../services/product-management/distribution/headquarter/headquarter.service';
import { SupportService } from 'src/services/support/support.service';
import { ProductHeadquarterService } from '../../../services/product-management/distribution/product-headquarter/product-headquarter.service';

@Component({
  selector: 'app-assign-products',
  templateUrl: './assign-products.component.html',
  styleUrls: ['./assign-products.component.css'],
})
export class AssignProductsComponent implements OnInit {
  //!!_prices ain't prices, prices are headquarter
  //!! same happens with _priceColumn
  // TABLES
  _products = [];
  _productsInTable = [];
  _prices = [];
  _productColumn = ['_category', '_brand', '_size', '_stock'];
  _priceColumn = ['_nameKindPrice', '_amountPrice'];
  _productIndex: number[] = [];
  _productSelected: any[] = [];
  _pricesToSend: any[] = [];
  // _pricesReadyToSend: any[] = [];

  // INPUTS
  _search = '';
  _msg: any;
  constructor(
    private _modalS: NgbModal,
    private _msgS: MsgService,
    private _supportS: SupportService,
    private _productS: ProductService,
    private _headquarterS: HeadquarterService,
    private _productHS: ProductHeadquarterService
  ) {
    this._getProductsInit();
    this._getHeadquartersInit();
  }

  _getProductsInit() {
    this._productS._readFull().subscribe((_products: any) => {
      // console.log(_products);
      const _productsInTable = _products.map((_product: any) => {
        const _costProduct = _product._price.filter(
          (_price: any) => _price._kindPrice._name.toLowerCase() === 'compra'
        );
        // console.log('COST PRODUCT', _costProduct);
        if (_costProduct.length === 0) return null;
        else _product._amount = _costProduct[0]._amount;
        if (!_product._stock) _product._stock = 0;

        return _product;
      });

      this._products = _productsInTable.filter((e: any) => e !== null);
      this._productsInTable = this._products;
      // console.log(this._productsInTable);
    });
  }

  _getHeadquartersInit() {
    this._headquarterS.read().subscribe((e: any) => {
      this._prices = e;
      this._getSendPricesInit();
    });
  }

  _getSendPricesInit() {
    this._prices.forEach((e: any) => {
      this._pricesToSend.push({
        _idHeadquarter: e._id,

        _stock: '',
        _error: false,
        _content: '',
      });
    });
  }

  ngOnInit(): void {}

  // INPUT START
  _matching(_string: string, _object: any) {
    const _stringLC = _string.toLowerCase();
    const _regExp = new RegExp(_stringLC);

    const _amountString = _object._amount.toString();
    const _brandString = _object._brand._name.toLowerCase();
    const _categoryString = _object._category._name.toLowerCase();
    const _sizeString = _object._size._name.toLowerCase();

    // console.log(_regExp.test(_categoryString));
    return _regExp.test(_categoryString)
      ? true
      : _regExp.test(_brandString)
      ? true
      : _regExp.test(_sizeString)
      ? true
      : _regExp.test(_amountString)
      ? true
      : false;
  }

  _getProducts(_event: any) {
    // this._productIndex = -1;
    // this._productSelected = {};
    this._resetLocalArea();
    const _string = _event.target.value;
    this._productsInTable = this._products.filter((e) => {
      // console.log(e);
      return this._matching(_string, e);
    });
  }

  _catchValue(_event: any, _index: number) {
    const _result = this._supportS._numbers(_event);
    // console.log(_result);
    this._pricesToSend[_index]._stock = _result._value;
    this._pricesToSend[_index]._error = _result._error;
    this._pricesToSend[_index]._content = _result._content;
  }

  _wrote() {
    let _ready = false;
    this._pricesToSend.forEach((e: any) => {
      if (e._stock.length !== 0) _ready = true;
    });
    return _ready;
  }

  _inputSizeNo0() {
    let _ready = {
      _error: true,
      _type: 'error',
      _detail: 'Ingrese cantidades en una o varias sedes.',
    };
    this._pricesToSend.forEach((e: any) => {
      // console.log('x');
      if (e._stock.length !== 0) {
        _ready = {
          _error: false,
          _type: '',
          _detail: '',
        };
      }
    });
    return _ready;
  }

  _errorInputReady(): any {
    const _sizeNo0 = this._inputSizeNo0();
    let _ready = {
      _error: false,
      _type: '',
      _detail: '',
    };

    if (!_sizeNo0._error) {
      this._pricesToSend.forEach((e: any) => {
        if (parseInt(e._stock) === 0) {
          _ready = {
            _error: true,
            _type: 'error',
            _detail: 'Ingrese cantidades diferentes de 0.',
          };
        }
      });
      // if(!_ready._error) _rea
    } else {
      _ready = _sizeNo0;
    }

    return _ready;
  }

  _errorStockReady() {
    //el stock de la sumatoria de los seleccionados de be ser mayor o igual
    //al de los colocados
    let _minStock = 9999;
    let _totalAssign = 0;
    let _ready = {
      _error: false,
      _type: '',
      _detail: '',
    };

    this._productSelected.forEach((e: any) => {
      if (_minStock > e._stock) _minStock = e._stock;
    });

    this._pricesToSend.forEach((e: any) => {
      if (e._stock.length !== 0) _totalAssign += parseInt(e._stock);
    });

    if (_minStock < _totalAssign)
      _ready = {
        _error: true,
        _type: 'error',
        _detail:
          'Algun producto no cuenta con el stock sufiente para asignar a las sedes.',
      };

    return _ready;
    // console.log('RESULTS: ', _minStock, _totalAssign);
  }
  // INPUT END

  // SAVE START
  _resetLocalArea() {
    this._productIndex = [];
    this._productSelected = [];
    this._pricesToSend = [];
  }

  _reset() {
    this._resetLocalArea();
    this._getProductsInit();
    this._getHeadquartersInit();
  }

  _hasErrors() {
    const _wrote = this._wrote();
    const _errorInput = this._errorInputReady();
    const _errorStock = this._errorStockReady();
    const _productReady = this._productIndex.length === 0 ? false : true;

    if (!_wrote && !_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail:
          'Seleccione producto(s) e ingrese cantidades en la tabla de sedes.',
      };

    if (_errorInput._error) return _errorInput;

    if (!_productReady)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione uno o más productos.',
      };

    if (_errorStock._error) return _errorStock;

    return {
      _error: false,
      _type: '',
      _detail: 'Asignación exitosa.',
    };
  }

  _dataReadyToSend() {
    const _productIds: any = [];
    const _productStocks: any = [];
    const _headquarters: any[] = [];
    let _total = 0;

    this._productSelected.forEach((e: any) => {
      _productIds.push(e._id);
      _productStocks.push(e._stock);
    });

    this._pricesToSend.forEach((e: any) => {
      if (parseInt(e._stock)) {
        _headquarters.push({
          _idHeadquarter: e._idHeadquarter,
          _stock: e._stock,
        });
        _total += parseInt(e._stock);
      }
      // console.log(e)
    });

    return {
      _productIds,
      _total,
      _productStocks,
      _headquarters,
    };
  }

  _save(_content: any, _contentSpiner: any) {
    // console.log(this._dataReadyToSend());
    const _hasErrors = this._hasErrors();
    const _error = _hasErrors._error;
    if (!_error) {
      // this._priceS._createMultiple('')
      const _spinerRef = this._modalS.open(_contentSpiner, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
        keyboard: false,
        backdrop: 'static',
      });
      this._productHS
        ._createMultiple(this._dataReadyToSend())
        .subscribe((e) => {
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
