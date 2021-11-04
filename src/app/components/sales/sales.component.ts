import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from 'src/services/customer-support/sale-order/client/client.service';
import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { DetailSaleOrderService } from '../../../services/customer-support/sale-order/detail-sale-order/detail-sale-order.service';
import { DetailSaleOrderModel } from '../../../models/customer-support/sale-order/model.detailSaleOrder';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from 'src/services/product-management/price/price/price.service';
import { Client } from './client';
import { ProductsSOService } from '../../services/products-so.service';
import { MsgService } from '../../../services/support/msg.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  _client: any;
  _detailProducts = [];
  _detailProductsColumns = [
    '_category',
    '_brand',
    '_size',
    '_price',
    '_amount',
    '_subtotal',
  ];
  _msg: any;

  constructor(
    private router: Router,
    private _test: ProductsSOService,
    private _soS: SaleOrderService,
    private _dsoS: DetailSaleOrderService,
    private _modalS: NgbModal,
    private _msgS: MsgService,
    private _clientS: ClientService
  ) {
    const _client = new Client();
    this._client = _client.getClient();
    this._mngSO();
    this._loadProducts();
    this._mngClientLS();
  }

  _loadProducts() {
    this._dsoS
      .readFullByIdSaleOrder(localStorage.getItem('_idSO'))
      .subscribe((e: any) => (this._detailProducts = e));
  }

  _setClientLS() {
    localStorage.setItem('_client', JSON.stringify(this._client));
  }

  _setClientLS2() {
    const _client = JSON.parse(JSON.stringify(localStorage.getItem('_client')));
    const _clientParsed = JSON.parse(_client);
    // console.log(_clientParsed);
    this._client._name._name = _clientParsed._name._name;
    this._client._DNI._name = _clientParsed._DNI._name;
    this._client._RUC._name = _clientParsed._RUC._name;
    this._client._cel._name = _clientParsed._cel._name;
  }

  _resetClientLS() {
    const _client = new Client();
    const _clientReset = _client.getClient();
    localStorage.setItem('_client', JSON.stringify(_clientReset));
    this._client = _clientReset;
  }

  _mngClientLS() {
    localStorage.getItem('_client')
      ? this._setClientLS2()
      : this._setClientLS();
  }

  _getIdHeadquarter(): any {
    const _dataUser: any = localStorage.getItem('_dataUser');
    const _dataUserObject = JSON.parse(_dataUser);
    return {
      _idHeadquarter: _dataUserObject._headquarter._id,
      _idSeller: new Date(),
    };
  }

  _mngSO(_boolToResetTable = false) {
    // console.log(localStorage.getItem('_idSO') ? true : false);
    const _idH = this._getIdHeadquarter();

    if (localStorage.getItem('_idSO')) {
      //CONDITION
      if (localStorage.getItem('_isSavedSO') === 'true') {
        this._soS.create(_idH).subscribe((e: any) => {
          localStorage.setItem('_idSO', e._id);
          localStorage.setItem('_isSavedSO', 'false');
          if (_boolToResetTable) {
            const _idSO = localStorage.getItem('_idSO');
            this._loadProducts();
          }
        });
      }
    } else {
      this._soS.create(_idH).subscribe((e: any) => {
        localStorage.setItem('_idSO', e._id);
        localStorage.setItem('_isSavedSO', 'false');
      });
    }
  }

  ngOnInit(): void {}

  // ACCEPTANCE CRITERIA SAVE
  _isPossibleSaveInputRequired() {
    const _isPossibleDNI = !this._validateDNIRequired();
    const _isPossibleName = !this._validateNameRequired();
    return _isPossibleDNI && _isPossibleName;
  }

  _hasErrors() {
    const _errorClient = !this._isPossibleSaveInputRequired();

    const _errorDetailProduct =
      this._detailProducts.length === 0 ? true : false;
    // console.log(_errorNameClient, _errorDNIClient, _errorDetailProduct);

    if (_errorClient && _errorDetailProduct)
      return {
        _error: true,
        _type: 'error',
        _detail:
          'Para guardar el pedido es necesario registrar el cliente(agregue nombre y DNI correctamente). No puede guardar el pedido, agregue un producto',
      };

    if (!_errorClient && _errorDetailProduct)
      return {
        _error: true,
        _type: 'error',
        _detail: 'No puede guardar el pedido, agregue un producto',
        _order: 1,
      };

    if (_errorClient && !_errorDetailProduct)
      return {
        _error: true,
        _type: 'error',
        _detail:
          'Para guardar el pedido es necesario registrar el cliente(agregue nombre y DNI correctamente)',
      };

    return { _error: false, _type: '', _detail: '' };
  }

  _isPossibleSaveInputNotRequired() {
    if (!this._isPossibleSaveRUC() && !this._isPossibleSaveCel())
      return {
        _error: true,
        _type: 'error',
        _detail: 'Celular y RUC mal escrito.',
      };

    if (!this._isPossibleSaveCel())
      return {
        _error: true,
        _type: 'error',
        _detail: 'Celular mal escrito.',
      };

    if (!this._isPossibleSaveRUC())
      return {
        _error: true,
        _type: 'error',
        _detail: 'RUC mal escrito.',
      };

    return { _error: false, _type: '', _detail: '' };
  }

  _saveAfterNoErrors(_content: any, _contentSpiner: any) {
    const _client = this._createFormatClient();
    const _successMsg = {
      _type: 'success',
      _detail: 'Pedido guardado exitosamente',
    };
    // creating modal reference
    const _modalReference = this._modalS.open(_contentSpiner, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
    });
    //end creating modal reference

    this._clientS.create(_client).subscribe((e: any) => {
      const _idClient = e._id;
      const _so = this._createFormatTakeSO(_idClient);
      this._soS.takeWithOutTS(_so).subscribe((e) => {
        _modalReference.close();
        localStorage.setItem('_isSavedSO', 'true');
        this._resetAll();
        this._triggerModal(_content, _successMsg, false);
      });
    });
  }

  _save(_content: any, _contentSpiner: any) {
    // console.log(this._isPossibleSaveInputRequired())
    const _hasErrors = this._hasErrors();
    if (!_hasErrors._error) {
      const _hasMoreErrors = this._isPossibleSaveInputNotRequired();
      if (!_hasMoreErrors._error) {
        console.log('ready to save');
        this._saveAfterNoErrors(_content, _contentSpiner);
        //save first the client, and into the susbscribe
        //save the sale(userheadquarter as idseller and idclient)
      } else {
        this._triggerModal(_content, _hasMoreErrors, false);
        // console.log('has errors in hasmoreerrors');
        // console.log(_hasMoreErrors);
      }
    } else {
      this._triggerModal(_content, _hasErrors, false);
      // console.log('has errors in has errors');
    }
    // console.log(this._isPossibleSaveInputNotRequired());
    // console.log(this._client);
    // localStorage.setItem('_idSO', e._id);

    // localStorage.setItem('_isSavedSO', 'true');
    // this._mngSO();
    // this._resetClientLS();
  }

  // ACCEPTANCE CRITERIA INPUTS
  // VALIDATING NAME
  _validateNameRequired() {
    return this._client._name._name.length === 0 ? true : false;
  }

  _validateName(_event: any) {
    const _result = this._client._name._errors._typeData._function(_event);
    this._client._name._name = _result._value;

    // Validating the data type
    this._client._name._errors._typeData._error = _result._error;

    // Validating the required
    this._client._name._errors._required._error = this._validateNameRequired();

    this._setClientLS();
  }

  // VALIDATING DNI
  _validateDNIRequired() {
    return this._client._DNI._name.length != this._client._DNI._maxLength
      ? true
      : false;
  }

  _validateDNI(_event: any) {
    const _result = this._client._DNI._errors._typeData._function(_event);
    this._client._DNI._name = _result._value;
    // console.log(this._client._DNI);
    // Validating the data type
    this._client._DNI._errors._typeData._error = _result._error;

    // Validating the required
    this._client._DNI._errors._required._error = this._validateDNIRequired();

    this._setClientLS();
  }

  // VALIDATING RUC
  _isPossibleSaveRUC() {
    return this._client._RUC._name.length === 11 ||
      this._client._RUC._name.length === 0
      ? true
      : false;
  }

  _validateRUC(_event: any) {
    const _result = this._client._RUC._errors._typeData._function(_event);
    this._client._RUC._name = _result._value;

    // Validating the data type
    this._client._RUC._errors._typeData._error = _result._error;
    this._client._RUC._errors._typeData._content = _result._content;
    if (
      this._client._RUC._name.length === 11 ||
      this._client._RUC._name.length === 0
    )
      this._client._RUC._errors._typeData._error = false;
    this._setClientLS();
    console.log(this._client);
  }

  // VALIDATING CEL
  _isPossibleSaveCel() {
    return this._client._cel._name.length === 9 ||
      this._client._cel._name.length === 0
      ? true
      : false;
  }

  _validateCel(_event: any) {
    const _result = this._client._cel._errors._typeData._function(_event);
    this._client._cel._name = _result._value;
    // console.log(_result)
    // Validating the data type
    this._client._cel._errors._typeData._error = _result._error;
    this._client._cel._errors._typeData._content = _result._content;
    if (
      this._client._cel._name.length === 9 ||
      this._client._cel._name.length === 0
    )
      this._client._cel._errors._typeData._error = false;
    this._setClientLS();
  }

  getTotalCost() {
    let _total = 0;
    this._detailProducts.forEach(
      (e: any) => (_total += e._price * parseInt(e._amount))
    );
    return _total;
  }

  // PART: MODAL START
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
  // PART: MODAL END

  // PART: CREATING FORMATS START
  _createFormatClient() {
    return {
      _name: this._client._name._name,
      _DNI: this._client._DNI._name,
      _cel: this._client._cel._name,
      _RUC: this._client._RUC._name,
    };
  }

  _createFormatTakeSO(_idClient: string) {
    const _dataUser1 = JSON.parse(
      JSON.stringify(localStorage.getItem('_dataUser'))
    );
    const _dataUser2 = JSON.parse(_dataUser1);
    const _idSeller = _dataUser2._userHeadquarter._idUser;

    return {
      _id: localStorage.getItem('_idSO'),
      _idClient,
      _idSeller,
    };
  }
  // PART: CREATING FORMATS END

  // PART: RESETING START
  _resetAll() {
    this._mngSO(true);
    this._resetClientLS();
  }
  // PART: RESETING END

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }
}
