import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { fullUris } from './brand.keys';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  // private _idHeadquarter: string = '6129c85483df9e42f027015a';
  private _fullUris = fullUris;

  constructor(private http: HttpClient) {}

  _create(_name: string) {
    return this.http.post(this._fullUris._create, {_name});
  }

  _read() {
    return this.http.get(this._fullUris._read);
  }

  readByHeadquarter(_idHeadquarter: string) {
    const _uri = this._fullUris._readByHeadquarter(_idHeadquarter);
    return this.http.get(_uri);
  }
}
