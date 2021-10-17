import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from '../../../../services/customer-support/sale-order/sale-order/sale-order.service';
// import { SaleOrderModel } from 'src/models/customer-support/sale-order/model.saleOrder';
import { SupportService } from 'src/services/support/support.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  _opened = true;

  constructor(
    private _http: HttpClient,
    private _saleOrderService: SaleOrderService,
    public _supportService: SupportService
  ) {
    // console.log(this._saleOrderService._idSaleOrder);
  }

  ngOnInit(): void {}

  mainCreateSaleOrder() {}

  createSaleOrder() {
    // console.log('create',this._saleOrderService._idSaleOrder);
    // localStorage.setItem('_idSaleOrder', '6147f02075130212ac4800be');
    const _idSaleOrderLS = localStorage.getItem('_idSaleOrder');
    // console.log(_idSaleOrderLS, typeof _idSaleOrderLS)

    if (_idSaleOrderLS?.length === 0 || !_idSaleOrderLS)
      this._saleOrderService.create().subscribe((resp) => {
        console.log('sale order created', resp);
        const _idSaleOrder = JSON.parse(JSON.stringify(resp))._id;
        localStorage.setItem('_idSaleOrder', _idSaleOrder);
      });
    else console.log(_idSaleOrderLS);
  }

  showID() {
    console.log(this._saleOrderService._idSaleOrder);
  }

  searchProducts() {}

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
