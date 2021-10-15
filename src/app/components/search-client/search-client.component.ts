import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/models/customer-support/sale-order/model.client';
import { ClientService } from '../../../services/customer-support/sale-order/client/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
})
export class SearchClientComponent implements OnInit {
  modeModal: string[] = ['Registrar', 'Modificar'];
  _clients: any = [];

  _displayedColumns: string[] = ['_name', '_DNI', '_RUC', '_cel', '_address'];
  _clickedRow: string = '';
  _selectedRowIndex = -1;
  _false = null;

  constructor(
    private router: Router,
    private _http: HttpClient,
    public _clientService: ClientService
  ) {}

  ngOnInit(): void {}

  salesRedirect() {
    // this._clientService._client = this_cli
    this.router.navigate(['/sales']);
  }

  _fGetClients(_name: string, _DNI: string) {
    _name = _name ? _name : 'null';
    _DNI = _DNI ? _DNI : 'null';
    console.log(this._clientService._client);
    // console.log(this._selectedRowIndex)
    // console.log(this._clientService._selectedRowIndex);
    // this._selectedRowIndex = -1
    this._clientService._selectedRowIndex = -1;
    // console.log(this._clientService._selectedRowIndex)
    this._clientService
      .readByNameDNI(_name, _DNI)
      .subscribe((_resultClient) => {
        this._clients = _resultClient;
        // this._selectedRowIndex =
      });

    console.log('CLIENTTSSS: XDD',this._clients);
  }

  highlight(row: ClientModel, i: number) {
    // this._selectedRowIndex = i;
    // console.log(row, typeof row)
    this._clientService._client = row;
    this._clientService._selectedRowIndex = i;
    // console.log(this._clientService._selectedRowIndex);
  }
  hola: string = 'asdf';
  submit(form: NgForm) {
    console.log(form);
  }
}
