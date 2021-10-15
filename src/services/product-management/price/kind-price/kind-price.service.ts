import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { fullUris } from './kind-price.keys';

@Injectable({
  providedIn: 'root',
})
export class KindPriceService {
  // private _idHeadquarter: string = '6129c85483df9e42f027015a';
  private _fullUris = fullUris;

  constructor(private _http: HttpClient) {}

  _read() {
    return this._http.get(this._fullUris._read);
  }

  

  readByHeadquarter(_idHeadquarter: string) {
    const _uri = this._fullUris._readByHeadquarter(_idHeadquarter);
    return this._http.get(_uri);
  }
}
