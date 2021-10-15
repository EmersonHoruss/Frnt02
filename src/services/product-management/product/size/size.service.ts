import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { fullUris } from './size.keys';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
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
