import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../../../../models/customer-support/sale-order/model.client';
import { fullUris } from './client.keys';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private _fullUris = fullUris;
  _selectedRowIndex: number = -1;
  _client: ClientModel = {
    _id: '',
    _DNI: '',
    _name: '',
    _address: '',
    _cel: '',
    _shipping: true,
    _RUC: '',
    createdAt: '',
    updatedAt: '',
  };

  constructor(private http: HttpClient) {}

  //Register a client
  create(_client:any) {
    // console.log(this._fullUris)
    return this.http.post(this._fullUris._create, _client);
  }

  update(_id: string) {
    //implementing
  }

  readByNameDNI(_name: string, _DNI: string) {
    const _uri = this._fullUris._readByNameDNI(_name, _DNI);
    return this.http.get(_uri);
  }

  //not requested
  read() {
    // console.log(this._fullUris);
    return this.http.get(this._fullUris._read);
  }

  resetClient() {
    this._client = {
      _id: '',
      _DNI: '',
      _name: '',
      _address: '',
      _cel: '',
      _shipping: true,
      _RUC: '',
      createdAt: '',
      updatedAt: '',
    };
  }
}
