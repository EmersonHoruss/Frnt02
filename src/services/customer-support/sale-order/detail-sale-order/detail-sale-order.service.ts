import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailSaleOrderModel } from '../../../../models/customer-support/sale-order/model.detailSaleOrder';
import { fullUris } from './detail-sale-order.keys';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailSaleOrderService {
  private _fullUris = fullUris;
  _amount = 0;
  _selectedRowIndex: number = -1;

  _detailSO = [];

  constructor(private http: HttpClient) {}

  create(_detailSO: DetailSaleOrderModel) {
    // console.log(this._fullUris)
    // console.log('detail-sale-order-create')
    console.log(_detailSO);
    return this.http.post(this._fullUris._create, _detailSO);
  }

  update(_detailSO: DetailSaleOrderModel) {
    // console.log(this._fullUris)
    return this.http.put(this._fullUris._update, _detailSO);
  }

  // not yet used
  readByIdSaleOrder(_idSaleOrder: string) {
    // console.log(this._fullUris)
    const _redByIdUri = this._fullUris._readByIdSO + _idSaleOrder;
    return this.http.get(_redByIdUri);
  }

  //currently used
  readFullByIdSaleOrder(_idSaleOrder: string | null): Observable<any> {
    // console.log(this._fullUris)
    // _validatedIdSaleOrder
    const _readByIdUri = this._fullUris._readFullByIdSO + _idSaleOrder;
    return this.http.get(_readByIdUri);
    // return this.http.get(_readByIdUri).toPromise();
  }

  deleteOneById(_idDetailSO: string) {
    const _readByIdUri = this._fullUris._deleteOneById + _idDetailSO;
    // console.log(_readByIdUri)
    return this.http.delete(_readByIdUri);
  }

  _createOrUpdate(_createOrUpdate: any) {
    return this.http.post(this._fullUris._createOrUpdate, _createOrUpdate);
  }

  _createPlusAmount(_detailSO: any) {
    return this.http.post(this._fullUris._createPlusAmount, _detailSO);
  }

  _updatePlusAmount(_detailSO: any) {
    return this.http.put(this._fullUris._updatePlusAmount, _detailSO);
  }
}
