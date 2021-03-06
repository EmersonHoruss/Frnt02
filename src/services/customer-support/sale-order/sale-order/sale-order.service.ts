import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaleOrderModel } from '../../../../models/customer-support/sale-order/model.saleOrder';
import { fullUris } from './sale-order.keys';

@Injectable({
  providedIn: 'root',
})
export class SaleOrderService {
  private _fullUris = fullUris;
  _idSaleOrder: string = '';
  _detailSOs: any = [];

  constructor(private http: HttpClient) {}

  create(_send: any) {
    // console.log(this._fullUris)
    return this.http.post(this._fullUris._create, _send);
  }

  delete() {
    // It just could fail if you delete from the browser
    // the _idSaleOrder variable
    const _uri =
      this._fullUris._deleteOne + localStorage.getItem('_idSaleOrder');
    return this.http.delete(_uri);
  }

  take(_saleOrder: SaleOrderModel) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._take, _saleOrder);
  }

  takeWithOutTS(_saleOrder: any) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._take, _saleOrder);
  }

  nonPaid() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._nonPaid);
  }

  collect(_saleOrder: SaleOrderModel) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._collect, _saleOrder);
  }

  collectWithOutTS(_saleOrder: any) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._collect, _saleOrder);
  }

  paid() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._paid);
  }

  _deliver(_so: any) {
    return this.http.put(this._fullUris._deliver, _so);
  }

  _readWithStatus() {
    return this.http.get(this._fullUris._readWithStatus);
  }

  read() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._read);
  }

  _dailySales(_dateNow: any) {
    console.log(_dateNow);
    return this.http.post(this._fullUris._dailySales, _dateNow);
  }
}
