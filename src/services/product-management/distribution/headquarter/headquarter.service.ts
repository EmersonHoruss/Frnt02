import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { fullUris } from './headquarter.keys';

@Injectable({
  providedIn: 'root',
})
export class HeadquarterService {
  private _fullUris = fullUris;

  constructor(private http: HttpClient) {}

  create(_headquarter: any) {
    return this.http.post(this._fullUris._create, _headquarter);
  }

  read() {
    return this.http.get(this._fullUris._read);
  }
}
