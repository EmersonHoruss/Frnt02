import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailSaleOrderModel } from 'src/models/customer-support/sale-order/model.detailSaleOrder';
import { DetailSaleOrderService } from 'src/services/customer-support/sale-order/detail-sale-order/detail-sale-order.service';
import { ProductHeadquarterService } from 'src/services/product-management/distribution/product-headquarter/product-headquarter.service';
import { PriceService } from 'src/services/product-management/price/price/price.service';
import { BrandService } from 'src/services/product-management/product/brand/brand.service';
import { CategoryService } from 'src/services/product-management/product/category/category.service';
import { SizeService } from 'src/services/product-management/product/size/size.service';
// import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css'],
})
export class SalesDetailComponent implements OnInit {
  // for each headquarter u have specific products, so you need the id
  // headquarter then to get its products
  _idH: string = '614e0bc7c34eda1f44272b3a';

  //with these arrays will fill each selected html element
  //then user could choose one of them
  _sizes: any = [];
  _categories: any = [];
  _brands: any = [];

  // filter for the search
  _selectedSize: string = 'null';
  _selectedCategory: string = 'null';
  _selectedBrand: string = 'null';

  // result of the searching
  _products: any = [];
  _pricesSelectedProduct: any = [];

  // table column name
  _displayedColumnsProducts: string[] = ['_category', '_brand', '_size'];
  _displayedColumnsPrices: string[] = [
    '_nameKindPrice',
    '_amountPrice',
    '_drescriptionKindPrice',
  ];

  // selected table row
  _selectedProduct: any = { _stock: '' };
  _selectedPrice: any = {};

  // rules
  _couplesMinMax: any = [];

  constructor(
    private router: Router,
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _sizeService: SizeService,
    public _productHService: ProductHeadquarterService,
    public _pricesService: PriceService,
    public _detailSOService: DetailSaleOrderService // public _saleOrderService: SaleOrderService
  ) {
    this.startSelectors();
  }

  startSelectors() {
    this._brandService
      .readByHeadquarter(this._idH)
      .subscribe((_resultBrand) => {
        this._brands = _resultBrand;
      });

    this._categoryService
      .readByHeadquarter(this._idH)
      .subscribe((_resultCategory) => {
        this._categories = _resultCategory;
      });
      
    this._sizeService.readByHeadquarter(this._idH).subscribe((_resultSize) => {
      this._sizes = _resultSize;
    });
  }

  ngOnInit(): void {}

  _prepareSelectedProduct() {
    return { _stock: '' };
  }

  _prepareSelectedCategory() {
    this._selectedCategory =
      this._selectedCategory === ''
        ? 'null'
        : this._selectedCategory === 'Categoria'
        ? 'null'
        : this._selectedCategory;
    if (this._selectedCategory === 'null') this._products = [];
  }

  _prepareSelectedBrand() {
    this._selectedBrand =
      this._selectedBrand === ''
        ? 'null'
        : this._selectedBrand === 'Marca'
        ? 'null'
        : this._selectedBrand;
    if (this._selectedBrand === 'null') this._products = [];
  }

  _prepareSelectedSize() {
    this._selectedSize =
      this._selectedSize === ''
        ? 'null'
        : this._selectedSize === 'Talla'
        ? 'null'
        : this._selectedSize;
    if (this._selectedSize === 'null') this._products = [];
  }

  _prepareAllSelecteds() {
    this._prepareSelectedCategory();
    this._prepareSelectedBrand();
    this._prepareSelectedSize();

    //reseting values
    this._productHService._selectedRowIndex = -1;
    this._pricesService._selectedRowIndex = -1;
    this._detailSOService._amount = 0;
    this._selectedProduct = this._prepareSelectedProduct();
    this._pricesSelectedProduct = [];
    this._couplesMinMax = [];
  }

  // each time user select a category, brand or size will get a
  // list of product through this function
  _fGetProducts() {
    this._prepareAllSelecteds();
    this._productHService
      .readByBrandCategorySize(
        this._idH,
        this._selectedBrand,
        this._selectedCategory,
        this._selectedSize
      )
      .subscribe((_resultProductH) => {
        this._products = _resultProductH;
        // console.log(this._products);
        // this._selectedRowIndex =
      });
    // console.log(
    //   'COMPONENT:',
    //   this._selectedBrand,
    //   this._selectedCategory,
    //   this._selectedSize
    // );
  }

  _fSelectedCategory(_idCategory: string) {
    this._selectedCategory = _idCategory;
    this._fGetProducts();
    // console.log('Selected Category', _idCategory);
  }

  _fSelectedBrand(_idBrand: string) {
    this._selectedBrand = _idBrand;
    this._fGetProducts();
    // console.log('Selected Brand', _idBrand);
  }

  _fSelectedSize(_idSize: string) {
    this._selectedSize = _idSize;
    this._fGetProducts();
    // console.log('Selected Size', _idSize);
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

  _fGetPricesSelectedProduct() {
    // get all the prices and render in the table
    const _idProduct = this._selectedProduct._product._id;
    this._pricesService
      .readFullPricesByIdProduct(_idProduct)
      .subscribe((_prices) => {
        this._pricesSelectedProduct = _prices;
        this._fGetCouplesMinMax();
        // console.log(this._couplesMinMax)
      });
  }

  highlight(row: any, i: number) {
    this._productHService._selectedRowIndex = i;
    this._selectedProduct = row;
    this._pricesService._selectedRowIndex = -1;
    // console
    this._fGetPricesSelectedProduct();

    //disable confirm button
    this._detailSOService._amount = 0;
    // console.log('FUCKKK UU ROWW', row);
  }

  selectingRowPriceTable(value: any) {
    // console.log(value,typeof value)
    // console.log(this._couplesMinMax)
    for (let i = 0; i < this._couplesMinMax.length; i++) {
      let _couple = this._couplesMinMax[i];
      // console.log(_couple[0] <= parseInt(value) && _couple[1] >= parseInt(value))
      if (_couple[0] <= parseInt(value) && _couple[1] >= parseInt(value)) {
        this._pricesService._selectedRowIndex = i;
        break;
      }
      // console.log('xd');
    }
  }

  triggerConfirmButton(value: any) {
    this.selectingRowPriceTable(value);

    this._detailSOService._amount = parseInt(value);
  }

  salesRedirect() {
    //reseting values
    this._productHService._selectedRowIndex = -1;
    this._detailSOService._amount = 0;
    this._couplesMinMax = [];
    this._pricesService._selectedRowIndex = -1;

    //
    this.router.navigate(['/sales']);
  }

  saveDetailSO() {
    //get price
    const _price =
      this._pricesSelectedProduct[this._pricesService._selectedRowIndex]
        ._amount;

    //get amount
    const _amount = this._detailSOService._amount;

    //get idProductH
    const _idProductHeadquarter = this._selectedProduct._id;

    //get idSaleOrder
    // const _idSaleOrder = this._saleOrderService._idSaleOrder;
    const _idSaleOrderLS = localStorage.getItem('_idSaleOrder');
    const _idSaleOrder =
      typeof _idSaleOrderLS === 'string' ? _idSaleOrderLS : '';

    //build detail sale order
    const _detailSO: DetailSaleOrderModel = {
      _id: '',
      _price,
      _amount,
      _idProductHeadquarter,
      _idSaleOrder,
    };

    //save
    this._detailSOService.create(_detailSO).subscribe((_created) => {
      console.log(_created);
    });
    // console.log('detail sale order', _detailSO);
    // console.log('price', _price, typeof _price);
    // console.log('amount', _amount, typeof _amount);
    // console.log('total price', typeof this._detailSOService._amount);
    // console.log('id productH', _idProductH);
    // console.log('id sale order', _idSaleOrder);
  }

  confirm() {
    this.saveDetailSO();
    this.salesRedirect();
  }

  // I have to reset the prices' values when change select's state
  // I have to reset the index in the server too

  // setAmount(amountSell: any) {
  //   // console.log(amountSell.min);
  //   this._detailSOService._amount = amountSell;
  // }
}
