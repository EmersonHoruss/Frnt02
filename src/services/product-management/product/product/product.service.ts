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
    _product._stock = 0;
    _product._manufactured = false;

    // console.log(_product);
    return this._http.post(this._fullUris._create, _product);
  }

  _createWithNoId(_product: any) {
    return this._http
      .post(this._fullUris._createWithNoId, _product)
      .toPromise();
    // .catch((e) => e.error);
  }

  _read() {}
}