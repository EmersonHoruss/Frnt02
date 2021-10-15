import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from 'src/services/customer-support/sale-order/client/client.service';
import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { DetailSaleOrderService } from '../../../services/customer-support/sale-order/detail-sale-order/detail-sale-order.service';
import { DetailSaleOrderModel } from '../../../models/customer-support/sale-order/model.detailSaleOrder';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from 'src/services/product-management/price/price/price.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  _idSaleOrder: string | null = localStorage.getItem('_idSaleOrder');
  _detailSO: DetailSaleOrderModel = {
    _id: 'string',
    _price: 0,
    _amount: 0,
    _idProductHeadquarter: '',
    _idSaleOrder: '',
  };

  _amount: number = 0;
  // rules
  _couplesMinMax: any = [];

  // arrays save the data gave of service
  _detailSOs: any = [];
  _pricesSelectedProduct: any = [];

  // table column name
  _displayedColumnsDetailSO: string[] = [
    '_category',
    '_brand',
    '_size',
    '_price',
    '_amount',
    '_subtotal',
  ];

  _displayedColumnsPrices: string[] = [
    '_nameKindPrice',
    '_amountPrice',
    '_drescriptionKindPrice',
  ];

  // _displayedColumnsDetailSOFooter: string[] = ['_category','_subtotal']
  constructor(
    private router: Router,
    public _clientService: ClientService,
    public _detailSOService: DetailSaleOrderService,
    private _saleOrderService: SaleOrderService,
    public _pricesService: PriceService,
    public modal: NgbModal
  ) {
    this.resetSelectedRowIndex();
  }

  ngOnInit(): void {
    this.getFullDetailSaleOrder();
  }

  getFullDetailSaleOrder() {
    this._detailSOService
      .readFullByIdSaleOrder(this._idSaleOrder)
      .subscribe((_fullDetailSOs) => {
        this._detailSOs = _fullDetailSOs;
      });
  }

  resetSelectedRowIndex() {
    this._detailSOService._selectedRowIndex = -1;
  }

  highlight(row: any, i: number) {
    this._detailSOService._selectedRowIndex = i;
    this._detailSO = row;
  }

  // *** FUNCTIONALITY BUTTONS ***
  // CLIENT MENU
  addClient() {
    this.router.navigate(['/search-client']);
  }

  updateClient() {}

  // DETAIL SALE ORDER MENU
  addDetailSO() {
    this.router.navigate(['/sales-detail']);
  }

  updateDetailSO(updateDSO: any) {
    const _detailSO: any = this._detailSO;
    const _idProduct: any = _detailSO._productHeadquarter._product._id;

    this._pricesService
      .readFullPricesByIdProduct(_idProduct)
      .subscribe((_prices) => {
        this._pricesSelectedProduct = _prices;
        this._fGetCouplesMinMax();

        console.log(this._couplesMinMax);
      });

    this.modal.open(updateDSO, { centered: true, size: 'lg' });
    // this.router.navigate(['/update-detail-so']);
  }

  deleteDetailSO() {
    const _idDetailSO = this._detailSO._id;
    this._detailSOService.deleteOneById(_idDetailSO).subscribe((res) => {
      console.log(res);
      this._detailSOs = this.getFullDetailSaleOrder();
      console.log(this._detailSO);
    });

    this._detailSOService._selectedRowIndex = -1;
    // this._detailSOService.deleteOneById(_idDetailSO)
    // console.log(_idDetailSO);
  }

  // SALE ORDER MENU
  takeSaleOrder() {
    console.log("u're in the sales");
    this.router.navigate(['/sales']);
  }

  deleteSaleOrder() {
    this._saleOrderService.delete().subscribe((_msje) => {
      console.log(_msje);
      // We can get better down code because we can just call
      // a method and make the query and save in the local storage
      // the sale order's id
      // SEE THE NAVBAR COMPONENT, IT HAPPENS THE SAME(include
      // a validation)
      this._saleOrderService.create().subscribe((resp) => {
        console.log('sale order created', resp);
        const _idSaleOrder = JSON.parse(JSON.stringify(resp))._id;
        localStorage.setItem('_idSaleOrder', _idSaleOrder);
        // this.router.navigate(['/sales']);
      });
      this._detailSOs = [];
      this._clientService.resetClient();
    });

    // console.log('a')
  }

  // *** MODALS ***
  // CLIENT

  // DETAIL SALE ORDER
  saveUpdating(_amountSell: any) {
    console.log(_amountSell);
  }

  // *** DISABLING BUTTONS ***
  // CLIENT MENU
  disableClientButton() {
    // console.log('LENGHT',this._clientService._client._name.length)
    return this._clientService._client._name.length === 0 ? true : false;
  }

  // DETAIL SALE ORDER MENU
  disableDetailSOButton() {
    return this._detailSOService._selectedRowIndex === -1 ? true : false;
  }

  // SALE ORDER MENU
  disableSOButton() {
    // console.log(this._detailSOs.length);
    return this._detailSOs.length === 0 ? true : false;
  }
  // _totalCost: number = 0;
  // OTHER
  getTotalCost() {
    let _totalCost = 0;
    for (const _detailSO of this._detailSOs) {
      const _subtotalCost = _detailSO._price * _detailSO._amount;
      _totalCost += _subtotalCost;
    }
    return _totalCost;
  }

  _fGetCouplesMinMax() {
    this._couplesMinMax = [];
    for (const _price of this._pricesSelectedProduct) {
      const _couple: any = [];
      const _beginningAmount = _price._kindPrice._beginningAmount;
      const _lastAmount = _price._kindPrice._lastAmount;

      _couple.push(_beginningAmount, _lastAmount);
      this._couplesMinMax.push(_couple);
    }
    // console.log(this._couplesMinMax);
  }

  getDetailSO() {
    const _detailSO: any = this._detailSO;
    const _category: any =
      _detailSO._productHeadquarter._product._category._name;
    // const _brand: any = _detailSO._productHeadquarter._product._brand._name;
    const _brand: any = 'CAMBIAME ANTES DE SUBIR';
    const _size: any = _detailSO._productHeadquarter._product._size._name;
    const _amount: any = _detailSO._amount;
    const _stock: any = _detailSO._productHeadquarter._stock;
    const _maxRange: any = _stock + _amount;
    
    return {
      _category,
      _brand,
      _size,
      _amount,
      _stock,
      _maxRange,
    };
  }
}
