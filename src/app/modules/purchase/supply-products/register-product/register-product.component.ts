import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/product-management/product/category/category.service';
import { SizeService } from '../../../../../services/product-management/product/size/size.service';
import { BrandService } from '../../../../../services/product-management/product/brand/brand.service';
import { HeadquarterService } from '../../../../../services/product-management/distribution/headquarter/headquarter.service';
import { ProductHeadquarterService } from '../../../../../services/product-management/distribution/product-headquarter/product-headquarter.service';
import { SupportService } from '../../../../../services/support/support.service';
import { MsgService } from '../../../../../services/support/msg.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
})
export class RegisterProductComponent implements OnInit {
  //START **Declaring variables**
  // selecteds
  _sizes: any = [];
  _categories: any = [];
  _brands: any = [];
  _headquarters: any = [];

  // filter for the search
  _selectedSize: any;
  _selectedCategory: any;
  _selectedBrand: any;
  _selectedHeadquarter: any;

  // get product
  _newProduct = '';
  _currentStock: any;
  _currentCost: any;
  _newCost: any;
  _newAmount: any;

  //flags
  _onceCheckedHeadquarter = true;
  _readyRegister = true;
  _readyConfirmBtn = true;
  _readyResetModal = false;

  // swal = false;
  // Messages
  _msg: any;

  //END **Declaring variables**

  constructor(
    private _categoryS: CategoryService,
    private _sizeS: SizeService,
    private _brandS: BrandService,
    private _headquarterS: HeadquarterService,
    private _productHS: ProductHeadquarterService,

    public _msgS: MsgService,
    public _supportS: SupportService,

    private _modalS: NgbModal
  ) {
    this._startMainSelectors();
  }
  ngOnInit(): void {}

  // START **Functions selects at start**
  _startHeadquarterSelector() {
    this._headquarterS.read().subscribe((_resultHeadquarter: any) => {
      this._headquarters = _resultHeadquarter.map((e: any) => {
        e._fullAddress =
          e._address + ' stand N° ' + e._stand + ' piso ' + e._flat;
        return e;
      });
    });
  }

  _startBrandSelector() {
    this._brandS._read().subscribe((e) => {
      this._brands = e;
    });
  }

  _startCategorySelector() {
    this._categoryS._read().subscribe((e) => {
      this._categories = e;
    });
  }

  _startSizeSelector() {
    this._sizeS._read().subscribe((e) => {
      this._sizes = e;
    });
  }

  // fill all the  data in the selects
  _startMainSelectors() {
    this._startHeadquarterSelector();
    this._startBrandSelector();
    this._startSizeSelector();
    this._startCategorySelector();
  }

  // END **Functions selects at start**

  // START **Functions selects after start**
  //reset the data in the selects
  _resetSelects() {
    this._headquarters = [];
    this._categories = [];
    this._sizes = [];
    this._brands = [];
  }

  //reset the selected item in each select
  _resetSelecteds() {
    this._selectedHeadquarter = null;
    this._selectedBrand = null;
    this._selectedCategory = null;
    this._selectedSize = null;
  }

  _headquarterSelect(_event: any) {
    this._allSelectsAreSelected();
  }

  _brandSelect(_event: any) {
    this._allSelectsAreSelected();
  }

  _sizeSelect(_event: any) {
    this._allSelectsAreSelected();
  }

  _categorySelect(_event: any) {
    this._allSelectsAreSelected();
  }

  _undefinedToFalse(_string: any) {
    return _string ? true : false;
  }

  _allSelectsAreSelected() {
    return (
      this._undefinedToFalse(this._selectedHeadquarter) &&
      this._undefinedToFalse(this._selectedBrand) &&
      this._undefinedToFalse(this._selectedCategory) &&
      this._undefinedToFalse(this._selectedSize)
    );
  }

  _lookForProduct() {
    const _areSelecteds = this._allSelectsAreSelected();
    if (this._selectedHeadquarter) {
      this._productHS
        .readByBrandCategorySize(
          this._selectedHeadquarter,
          this._selectedBrand,
          this._selectedCategory,
          this._selectedSize
        )
        .subscribe((_result: any) => {
          const _length = _result.length;
          const _areSelecteds = this._allSelectsAreSelected();
          // this._manageInputs(_result, _length, _areSelecteds);
          // this._clearValuesInputs();
          // this._manageBtn();
        });
    }
  }

  _clearSelects() {
    this._selectedBrand = null;
    this._selectedSize = null;
    this._selectedCategory = null;
    this._selectedHeadquarter = null;
  }
  // END **Functions selects after start**

  //START **Functions inputs**
  _manageInputs(_foundProducts: any, _length: any, _areSelecteds: any) {
    if (_length === 0 && _areSelecteds) {
      this._readyRegister = false;
      this._updateInputsWhenLength0();
    } else if (_length === 1 && _areSelecteds) {
      this._readyRegister = false;
      this._updateInputsWhenLength1(_foundProducts);
    } else {
      this._readyRegister = true;
      this._currentStock = '';
    }
  }

  _updateInputsWhenLength0() {
    this._currentStock = 'no tiene stock(producto nuevo)';
    this._currentCost = 'no tiene costo(producto nuevo)';
  }

  _getCost(_foundProducts: any) {
    const _prices = _foundProducts[0]._product._price;
    const _price = _prices.filter((e: any) => e._kindPrice._name === 'Menor');

    return _price[0]._amount + ' S/';
  }

  _updateInputsWhenLength1(_foundProducts: any) {
    this._currentStock = _foundProducts[0]._stock;
    this._currentCost = this._getCost(_foundProducts);
  }

  _amountInput(_event: any) {
    this._supportS.naturalNumberNo0(_event);
    const _value = _event.target.value;
    _value ? (this._newAmount = _value) : (this._newAmount = '');
    this._manageBtn();
  }

  _costInput(_event: any) {
    this._supportS.naturalNumberNo0(_event);
    const _value = _event.target.value;
    _value ? (this._newCost = _value) : (this._newCost = '');
    this._manageBtn();
  }

  _clearValuesInputs() {
    this._newCost = null;
    this._newAmount = null;
  }

  _clearInputs() {
    this._clearValuesInputs();
    this._currentCost = null;
    this._currentStock = null;
  }

  //END **Functions inputs**

  //START **Functions button**
  _resetFlags() {
    this._onceCheckedHeadquarter = true;
    this._readyRegister = true;
    this._readyConfirmBtn = true;
  }

  _resetAll() {
    this._clearInputs();
    this._clearSelects();
    this._resetFlags();
    //   this._readyRegister,
    //   this._readyConfirmBtn
    // );
  }

  closeResult = '';

  _openModal(content: any) {
    this._modalS
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
      })
      .result.then(
        (result) => {
          if (result === 'yes') {
            this._resetAll();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
  }

  _startNew(content: any) {
    const _isPossibleStartNew = this._readyConfirmBtn;
    // Cuando se activa el botón del confirmar
    // Se lanza un warning
    if (!_isPossibleStartNew) {
      this._msgS._setMsg({
        _type: 'warning',
        _detail:
          'Ten cuidado porque los cambios no se guardarán si le das en Sí',
      });
      this._msg = this._msgS._getMsg();
      this._openModal(content);
    } else {
      this._resetAll();
    }
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  _getBooleanCurrentCost() {
    const pattern = /\)$/;

    return this._currentCost ? !pattern.test(this._currentCost) : false;
  }

  _getBooleanCurrentStock() {
    const pattern = /\)$/;

    return this._currentStock ? !pattern.test(this._currentStock) : false;
  }

  _conditionManageBtn() {
    const _currentCost = this._getBooleanCurrentCost();
    const _newCost = this._newCost ? true : false;
    const _newAmount = this._newAmount ? true : false;
    return _newCost || (_newAmount && _currentCost);
  }

  _manageBtn() {
    if (this._conditionManageBtn()) {
      this._readyConfirmBtn = false;
    } else {
      this._readyConfirmBtn = true;
    }
  }
  //END **Functions button**
}
