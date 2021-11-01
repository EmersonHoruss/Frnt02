import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../services/support/msg.service';

@Component({
  selector: 'app-deliver-sale',
  templateUrl: './deliver-sale.component.html',
  styleUrls: ['./deliver-sale.component.css'],
})
export class DeliverSaleComponent implements OnInit {
  _sales = [];
  // _salesColumn = ['_name', '_DNI', '_totalAmount', '_state', '_deliver'];
  _salesColumn = ['_name', '_DNI', '_totalAmount', '_deliver'];
  _salesTable = [];

  _search = '';
  _saleOrder: any;
  _msg: any;

  constructor(
    private _saleOrderS: SaleOrderService,
    private _modalS: NgbModal,
    private _msgS: MsgService
  ) {
    this._getSalesInit();
  }

  ngOnInit(): void {}

  _getSalesInit() {
    this._saleOrderS._readWithStatus().subscribe((e: any) => {
      const _userH: any = localStorage.getItem('_dataUser');
      const _userHObject: any = JSON.parse(_userH);
      const _idHeadquarter: any = _userHObject._userHeadquarter._idHeadquarter;

      this._sales = e.filter(
        (e: any) =>
          e._headquarter._id === _idHeadquarter &&
          e._status.toLowerCase() === 'para entregar'
      );
      this._salesTable = this._sales;
      console.log(e);
      console.log(this._sales);
    });
  }

  _matching(_string: string, _object: any) {
    const _stringLC = _string.toLowerCase();
    const _regExp = new RegExp(_stringLC);

    const _nameString = _object._client._name.toString().toLowerCase();
    const _DNIString = _object._client._DNI.toString().toLowerCase();
    const _totalString = _object._total.toString().toLowerCase();

    return _regExp.test(_nameString)
      ? true
      : _regExp.test(_DNIString)
      ? true
      : _regExp.test(_totalString)
      ? true
      : false;
  }

  _searchSales(_event: any) {
    const _string = _event.target.value;
    this._salesTable = this._sales.filter((e) => this._matching(_string, e));
  }

  _deliver(e: any, _content: any, _contentSpiner: any) {
    const _idSO = e._id;
    const _dataUser: any = localStorage.getItem('_dataUser');
    const _dataUserObject: any = JSON.parse(_dataUser);
    const _idDeliver: any = _dataUserObject._userHeadquarter._idUser;

    const _referenceLoader = this._modalS.open(_contentSpiner, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
    });
    console.log(this._saleOrder, typeof this._saleOrder);
    this._saleOrderS
      ._deliver({
        _id: _idSO,
        _idDeliver,
      })
      .subscribe((e) => {
        _referenceLoader.close();
        this._getSalesInit();

        this._triggerModal(
          _content,
          { _type: 'success', _detail: 'Entrega completada' },
          false
        );
      });
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

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }
}
