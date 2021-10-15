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

  create() {
    // console.log(this._fullUris)
    return this.http.post(this._fullUris._create, {});
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

  nonPaid() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._nonPaid);
  }

  collect(_saleOrder: SaleOrderModel) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._collect, _saleOrder);
  }

  paid() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._paid);
  }

  read() {
    // console.log(this._fullUris)
    return this.http.get(this._fullUris._read);
  }
}
