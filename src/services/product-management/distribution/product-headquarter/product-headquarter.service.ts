import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductHeadquarterModel } from '../../../../models/product-management/distribution/model.productHeadquarter';
import { fullUris } from './product-headquarter.keys';

@Injectable({
  providedIn: 'root',
})
export class ProductHeadquarterService {
  private _fullUris = fullUris;
  private _idHeadquarter = '';
  _selectedRowIndex: number = -1;

  constructor(private http: HttpClient) {}

  create(_productH: any) {
    // console.log(this._fullUris)
    return this.http.post(this._fullUris._create, _productH);
  }

  _createMultiple(_multiple: any) {
    // console.log(this._fullUris)
    return this.http.post(this._fullUris._createMultiple, _multiple);
  }

  readByBrandCategorySize(
    _idH: string,
    _brand: string,
    _category: string,
    _size: string
  ) {
    const _uri = this._fullUris._readByBrandCategorySize(
      _idH,
      _brand,
      _category,
      _size
    );
    // console.log(_uri,_idH,_brand,_category,_size)
    return this.http.get(_uri);
  }

  red() {
    console.log(this._fullUris);
    return this.http.get(this._fullUris._read);
  }

  _updateById(_idProductH: string, _udpateProductH: any) {
    const _uri = this._fullUris._updateById(_idProductH);
    return this.http.put(_uri, _udpateProductH);
  }

  redFull(_idH: string) {
    // console.log(this._fullUris)
    const _redFullUri = this._fullUris._readFull + _idH;
    return this.http.get(_redFullUri);
  }
}
