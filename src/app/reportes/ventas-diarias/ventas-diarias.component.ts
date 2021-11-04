import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { ProductService } from '../../../services/product-management/product/product/product.service';

@Component({
  selector: 'app-ventas-diarias',
  templateUrl: './ventas-diarias.component.html',
  styleUrls: ['./ventas-diarias.component.css'],
})
export class VentasDiariasComponent implements OnInit {
  _dailySales: any[] = [
    {
      _headquarter: 'Sede 1',
      _amount: 3,
    },
    {
      _headquarter: 'Sede 2',
      _amount: 6,
    },
    {
      _headquarter: 'Sede 3',
      _amount: 7,
    },
    {
      _headquarter: 'Sede 4',
      _amount: 4,
    },
  ];

  constructor(
    private _sOS: SaleOrderService,
    private _productsS: ProductService
  ) {
    this._getInitDailySales();
  }

  _getDates() {
    const _date = new Date();

    _date.setHours(6);
    const _dateStart = _date.toString();
    _date.setHours(23);
    const _dateEnd = _date.toString();

    return { _dateStart, _dateEnd };
  }

  _getInitDailySales() {
    const _dates = this._getDates();

    this._sOS._dailySales(_dates).subscribe((e: any) => {
      console.log(e);
    });
  }

  ngOnInit(): void {}

  // EXTRA FUNCTIONS START
  // if day is positive so it add and if negative it less
  _plusDay(fecha: any, _days: any) {
    fecha.setDate(fecha.getDate() + _days);
    return fecha;
  }
  // EXTRA FUNCTIONS END

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }
}
