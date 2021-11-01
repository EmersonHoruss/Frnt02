import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-products',
  templateUrl: './assign-products.component.html',
  styleUrls: ['./assign-products.component.css'],
})
export class AssignProductsComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  _setAmount(_event: any) {}

  _getTitlePage() {
    return 'Asignar Precios a Productos';
  }
}
