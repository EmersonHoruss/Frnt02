import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailSaleOrderModel } from 'src/models/customer-support/sale-order/model.detailSaleOrder';
import { DetailSaleOrderService } from 'src/services/customer-support/sale-order/detail-sale-order/detail-sale-order.service';
import { ProductHeadquarterService } from 'src/services/product-management/distribution/product-headquarter/product-headquarter.service';
import { PriceService } from 'src/services/product-management/price/price/price.service';
import { BrandService } from 'src/services/product-management/product/brand/brand.service';
import { CategoryService } from 'src/services/product-management/product/category/category.service';
import { SizeService } from 'src/services/product-management/product/size/size.service';
// import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { ProductsSOService } from '../../services/products-so.service';
import { SupportService } from '../../../services/support/support.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../services/support/msg.service';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css'],
})
export class SalesDetailComponent implements OnInit {
  // TABLES
  _products = [];
  _productsInTable = [];
  _prices = [];
  _productColumn = ['_category', '_brand', '_size', '_stock'];
  _priceColumn = ['_nameKindPrice', '_amountPrice', '_drescriptionKindPrice'];
  _productIndex = -1;
  _productSelected = {};

  // INPUTS
  _search = '';
  _amount = {
    _value: '',
    _minLength: 3,
    _maxLength: 3,
    _required: false,
    _typeData: ['number'],
    _errors: {
      _typeData: {
        _error: false,
        _content: 'Solo puede ingresar números.',
      },
      _required: {
        _error: false,
        _content: 'Ingrese una cantidad si va a agregar al pedido.',
      },
    },
    _exist: false,
  };
  _msg: any;

  constructor(
    public _productHS: ProductHeadquarterService,
    public _priceS: PriceService,
    private _supportS: SupportService,
    private _modalS: NgbModal,
    private _msgS: MsgService,
    private _dso: DetailSaleOrderService
  ) {
    this._getProductsInit();
  }

  ngOnInit(): void {}

  _getProductsInit() {
    // const _dataUser = localStorage.getItem('_dataUser');
    const _dataUser1 = JSON.parse(
      JSON.stringify(localStorage.getItem('_dataUser'))
    );
    const _dataUser2 = JSON.parse(_dataUser1);
    const _idH = _dataUser2._headquarter._id;
    // console.log('IDH',_idH);
    this._productHS.redFull(_idH).subscribe((e: any) => {
      this._products = e;
      this._productsInTable = this._products;
      // console.log(this._products);
    });
  }

  _matching(_string: string, _object: any) {
    const _stringLC = _string.toLowerCase();
    const _regExp = new RegExp(_stringLC);

    const _stockString = _object._stock.toString();
    const _brandString = _object._product._brand._name.toLowerCase();
    const _categoryString = _object._product._category._name.toLowerCase();
    const _sizeString = _object._product._size._name.toLowerCase();

    // console.log(_regExp.test(_categoryString));
    return _regExp.test(_categoryString)
      ? true
      : _regExp.test(_brandString)
      ? true
      : _regExp.test(_sizeString)
      ? true
      : _regExp.test(_stockString)
      ? true
      : false;
  }

  // START INPUTS
  _getProducts(_event: any) {
    this._productIndex = -1;
    this._productSelected = {};
    this._prices = [];
    const _string = _event.target.value;
    this._productsInTable = this._products.filter((e) =>
      this._matching(_string, e)
    );
  }

  _validateAmountRequired() {
    return this._amount._value.length === 0 ? true : false;
  }

  _setAmount(_event: any) {
    const _result = this._supportS._naturalNumberNo0(_event);
    this._amount._value = _result._value;

    //Validating the data type
    this._amount._errors._typeData._error = _result._error;

    //Validating the required
    this._amount._errors._required._error = this._validateAmountRequired();
  }
  // END INPUTS

  // START BUTTONS
  _amountIsBiggerStock() {
    const _supportProduct = JSON.parse(JSON.stringify(this._productSelected));
    const _stock = _supportProduct._stock;
    const _amount = parseInt(this._amount._value);
    return _amount > _stock ? true : false;
  }

  _hasErrors() {
    const _errorProduct = this._productIndex === -1 ? true : false;
    const _errorAmount = this._amount._value.length === 0 ? true : false;
    const _errorPrice = this._prices.length === 0 ? true : false;
    const _amountBiggerStock = this._amountIsBiggerStock();

    if (_errorAmount && _errorProduct)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione un producto e ingrese la cantidad para guardar.',
      };

    if (!_errorAmount && _errorProduct)
      return {
        _error: true,
        _type: 'error',
        _detail: 'Seleccione un producto.',
      };

    if (_errorAmount && !_errorProduct) {
      if (_errorPrice)
        return {
          _error: true,
          _type: 'error',
          _detail:
            'No es posible agregar productos porque no se le ha asignado los precios.',
        };
      return {
        _error: true,
        _type: 'error',
        _detail: 'Ingrese la cantidad.',
      };
    }

    if (!_errorAmount && !_errorProduct && _errorPrice)
      return {
        _error: true,
        _type: 'error',
        _detail:
          'No es posible agregar productos porque no se le ha asignado los precios.',
      };

    if (_amountBiggerStock)
      return {
        _error: true,
        _type: 'error',
        _detail:
          'No es posible agregar productos porque la cantidad ingresada es mayor al stock del producto.',
      };

    return {
      _error: false,
      _type: '',
      _detail: '',
    };
  }

  _getProduct() {
    const _objProduct = JSON.parse(JSON.stringify(this._productSelected));
    return {
      _amount: parseInt(this._amount._value),
      _idProductHeadquarter: _objProduct._id,
      _idSaleOrder: localStorage.getItem('_idSO'),
    };
  }

  _resetingValues() {
    // Reseting Values START
    this._productsInTable = [];
    this._amount._value = '';
    this._search = '';
    this._productIndex = -1;
    this._productSelected = {};
    // Reseting Values END
  }

  _ifCreate(_content: any, _modalReference: any) {
    const _product = this._getProduct();
    this._dso._createPlusAmount(_product).subscribe((e: any) => {
      _modalReference.close();
      if (!e._error) {
        this._triggerModal(_content, {
          _type: 'success',
          _detail: 'El producto ha sido añadido exitosamente al pedido.',
        });
        // console.log(e);
        this._resetingValues();
        this._getProductsInit();
      } else {
        this._triggerModal(_content, {
          _type: 'error',
          _detail: 'Cantidad no disponible. Actualice la página.',
        });
      }
    });
  }

  _ifUpdate(_content: any, _modalReference: any) {
    const _product = this._getProduct();
    this._dso._updatePlusAmount(_product).subscribe((e: any) => {
      _modalReference.close();
      if (!e._error) {
        this._triggerModal(_content, {
          _type: 'success',
          _detail: 'El producto ha sido añadido exitosamente al pedido.',
        });

        // console.log(e);
        this._resetingValues();
        this._getProductsInit();
      } else {
        this._triggerModal(_content, {
          _type: 'error',
          _detail: 'Cantidad no disponible. Actualice la página.',
        });
      }
    });
    // console.log(this._getProduct());
  }

  _createOrUpdate(_content: any, _contentSpiner: any) {
    const _idSaleOrder = localStorage.getItem('_idSO');
    const _anyProductSelected = JSON.parse(
      JSON.stringify(this._productSelected)
    );
    const _idProductHeadquarter = _anyProductSelected._id;

    // creating modal reference
    const _modalReference = this._modalS.open(_contentSpiner, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
    });
    //end creating modal reference

    this._dso
      ._createOrUpdate({
        _idProductHeadquarter,
        _idSaleOrder,
      })
      .subscribe((e: any) => {
        e._create
          ? this._ifCreate(_content, _modalReference)
          : this._ifUpdate(_content, _modalReference);
      });
  }

  _addSO(_content: any, _contentSpiner: any) {
    const _hasErrors = this._hasErrors();
    if (!_hasErrors._error) {
      // create or update
      this._createOrUpdate(_content, _contentSpiner);
    } else {
      this._triggerModal(_content, _hasErrors, false);
    }
  }
  // END BUTTONS

  highlight(row: any, i: number) {
    // console.log(localStorage.getItem('_idSO'));
    if (i === this._productIndex) {
      this._productIndex = -1;
      this._productSelected = {};
      this._prices = [];
    } else {
      this._productIndex = i;
      this._productSelected = row;
      this._prices = row._product._price.filter(
        (e: any) => e._kindPrice._name.toLowerCase() !== 'compra'
      );
      // console.log(this._prices);
    }
    // console.log(this._productSelected);
    // console.log(row, i);
  }

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
