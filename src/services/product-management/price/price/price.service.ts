import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { fullUris } from './price.keys';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  // private _idHeadquarter: string = '6129c85483df9e42f027015a';
  private _fullUris = fullUris;
  _selectedRowIndex: number = -1;

  constructor(private _http: HttpClient) {}

  _create(_price: any) {
    // console.log(_price);
    return this._http.post(this._fullUris._create, _price);
  }

  _createMultiple(_multiple: any) {
    // console.log(_multiple);
    // console.log(this._fullUris._createMultiple);

    return this._http.post(this._fullUris._createMultiple, _multiple);
  }

  _updateById(_idPrice: string, _updatePrice: any) {
    const _uri = this._fullUris._updateById(_idPrice);
    return this._http.put(_uri, _updatePrice);
  }

  readFullPricesByIdProduct(_idProduct: string) {
    const _uri = this._fullUris._fullPricesByIdProduct(_idProduct);
    return this._http.get(_uri);
    // console.log(_idProduct);
  }
}
