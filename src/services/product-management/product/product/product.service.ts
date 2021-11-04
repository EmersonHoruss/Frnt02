import { Injectable } from '@angular/core';
import { fullUris } from './product.keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _fullUris = fullUris;

  constructor(private _http: HttpClient) {}

  _create(_product: any) {
    // console.log(this._fullUris._create);
    _product._stock = 50;
    _product._manufactured = false;

    // console.log(_product);
    return this._http.post(this._fullUris._create, _product);
  }

  _createMultiple(_multiple: any) {
    return this._http.post(this._fullUris._createMultiple, _multiple);
  }

  _createWithNoId(_product: any) {
    return this._http
      .post(this._fullUris._createWithNoId, _product)
      .toPromise();
    // .catch((e) => e.error);
  }

  _read() {}

  _readFull() {
    return this._http.get(this._fullUris._readFull);
  }
}
