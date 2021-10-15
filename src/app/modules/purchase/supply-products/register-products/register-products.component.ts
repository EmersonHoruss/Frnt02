import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/product-management/product/category/category.service';
import { SizeService } from '../../../../../services/product-management/product/size/size.service';
import { BrandService } from '../../../../../services/product-management/product/brand/brand.service';
import { HeadquarterService } from '../../../../../services/product-management/distribution/headquarter/headquarter.service';
import { ProductHeadquarterService } from '../../../../../services/product-management/distribution/product-headquarter/product-headquarter.service';
import { SupportService } from '../../../../../services/support/support.service';
import { MsgService } from '../../../../../services/support/msg.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../../services/product-management/product/product/product.service';
import { KindPriceService } from '../../../../../services/product-management/price/kind-price/kind-price.service';
import { PriceService } from '../../../../../services/product-management/price/price/price.service';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css'],
})
export class RegisterProductsComponent implements OnInit {
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
  _newProduct: any;
  _currentStock: any;
  _currentCost: any;
  _newCost: any;
  _newAmount: any;

  //flags
  _readyRegister = false;
  _readyConfirmBtn = false;
  _readyResetModal = false;

  // swal = false;
  // Messages
  _msg: any;

  // Register
  _titleAdd = '';
  _placeHolderAdd = '';
  _ngModelAdd = '';
  _nameAdd = '';
  _partProduct = '';

  //END **Declaring variables**

  constructor(
    private _categoryS: CategoryService,
    private _sizeS: SizeService,
    private _brandS: BrandService,
    private _headquarterS: HeadquarterService,
    private _productHS: ProductHeadquarterService,
    private _productS: ProductService,
    private _kindPriceS: KindPriceService,
    private _priceS: PriceService,

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
    this._resetInputs();
    this._resetFlags();
    if (_areSelecteds) {
      this._productHS
        .readByBrandCategorySize(
          this._selectedHeadquarter,
          this._selectedBrand,
          this._selectedCategory,
          this._selectedSize
        )
        .subscribe((_result: any) => {
          this._manageInputs(_result);
          this._manageBtn();
        });
    }
  }

  // END **Functions selects after start**

  //START **Functions inputs**
  _manageInputs(_foundProducts: any) {
    const _length = _foundProducts.length;
    this._newProduct = null;
    if (_length === 0) {
      this._readyRegister = true;
    } else if (_length === 1) {
      this._readyRegister = true;
      this._updateInputsWhenLength1(_foundProducts);
    } else {
      this._readyRegister = false;
    }
  }

  //CHANGEEEE THE PRIIIIICEEE PLIIIIS
  _updateInputsWhenLength1(_foundProducts: any) {
    this._newProduct = _foundProducts[0];

    this._currentStock = _foundProducts[0]._stock;

    const _prices = _foundProducts[0]._product._price;
    const _price = _prices.filter((e: any) => e._kindPrice._name === 'Compra');
    console.log(this._newProduct);
    this._currentCost = _price[0]._amount;
    //EERRRORRR!!! Above line give an error when dosent filter the kind price by compra, fix it
    console.log(this._newProduct);
  }

  _amountInput(_event: any) {
    this._supportS.naturalNumberNo0(_event);
    const _value = _event.target.value;
    _value ? (this._newAmount = _value) : (this._newAmount = null);
    this._manageBtn();
  }

  _costInput(_event: any) {
    this._supportS.naturalNumberNo0(_event);
    const _value = _event.target.value;
    _value ? (this._newCost = _value) : (this._newCost = null);
    this._manageBtn();
  }

  _resetInputs() {
    this._newCost = null;
    this._newAmount = null;
    this._currentCost = null;
    this._currentStock = null;
  }

  //END **Functions inputs**

  //START **Functions button**
  _resetFlags() {
    this._readyRegister = false;
    this._readyConfirmBtn = false;
  }

  _resetAll() {
    this._resetInputs();
    this._resetSelecteds();
    this._resetFlags();
  }

  _manageBtn() {
    this._readyConfirmBtn = this._conditionManageConfirmBtn() ? true : false;
  }

  _startNew(_contentAdd: any, _content: any) {
    const _type = 'warning';
    const _detail =
      'Cuidado! Los datos escrito en "ingrese cantidad" o en "ingrese costo" no se guardarán si le das en Sí';

    // Cuando se activa el botón del confirmar
    // Se lanza un warning
    this._newAmount || this._newCost
      ? this._triggerAndActionModal(_contentAdd, _content, _type, _detail)
      : this._resetAll();
  }

  _conditionManageConfirmBtn() {
    const _currentCost = this._currentCost ? true : false;
    const _newCost = this._newCost ? true : false;
    const _newAmount = this._newAmount ? true : false;
    return _newCost || (_newAmount && _currentCost);
  }

  _generateProduct() {
    return {
      _idBrand: this._selectedBrand,
      _idCategory: this._selectedCategory,
      _idSize: this._selectedSize,
    };
  }

  _generateProductH(_idProduct: string = '', _idHeadquarter: string = '') {
    const _newAmount = parseInt(this._newAmount);
    // const _stock = _idProduct ? _newAmount : _newAmount + this._currentStock;
    const _stock = _idProduct ? _newAmount : _newAmount;

    console.log('new amount', this._newAmount, typeof this._newAmount);
    console.log(
      'current amount',
      this._currentStock,
      typeof this._currentStock
    );

    return {
      _stock,
      _idHeadquarter,
      _idProduct,
    };
  }

  _generatePrice(_idKindPrice: string = '', _idProduct: string = '') {
    // const _kindPrice = this._newProduct._prices.filter(
    //   (e: any) => e._name === 'Compra'
    // );

    // const _idKindPrice = _kindPrice[0]._id;

    return {
      _amount: this._newCost,
      _idKindPrice,
      _idProduct,
    };
  }

  _getIdProductH() {
    return this._newProduct._id;
  }

  _getIdPriceCosto() {
    const _listPrices = this._newProduct._product._price;
    const _priceCompra = _listPrices.filter(
      (e: any) => e._kindPrice._name === 'Compra'
    );
    const _idPriceCompra = _priceCompra[0]._id;
    return _idPriceCompra;
  }

  _postProduct() {
    const _product = this._generateProduct();

    this._productS._create(_product).subscribe((_product: any) => {
      const _productH = this._generateProductH(
        _product._id,
        this._selectedHeadquarter
      );

      this._productHS.create(_productH).subscribe((e) => {
        console.log(e);
      });

      this._kindPriceS._read().subscribe((_listKindPrices: any) => {
        const _compraPrice = _listKindPrices.filter(
          (e: any) => e._name === 'Compra'
        );

        const _idCompraPrice = _compraPrice[0]._id;
        const _price = this._generatePrice(_idCompraPrice, _product._id);
        this._priceS._create(_price).subscribe((e) => {
          console.log(e);
        });
      });
    });
  }

  _putProduct() {
    const _idProductH = this._getIdProductH();
    const _idPriceCosto = this._getIdPriceCosto();

    const _productH = this._generateProductH();
    const _price = this._generatePrice();

    if (this._newAmount)
      this._productHS
        ._updateById(_idProductH, _productH)
        .subscribe((e) => console.log(e));

    if (this._newCost)
      this._priceS
        ._updateById(_idPriceCosto, _price)
        .subscribe((e) => console.log(e));

    if (this._newAmount && this._newCost) {
      this._productHS
        ._updateById(_idProductH, _productH)
        .subscribe((e) => console.log(e));
      this._priceS
        ._updateById(_idPriceCosto, _price)
        .subscribe((e) => console.log(e));
    }
  }

  _functionalityConfirmButton() {
    this._newProduct ? this._putProduct() : this._postProduct();
  }

  _confirm(_contentAdd: any, _content: any) {
    this._functionalityConfirmButton();

    const _type = 'success';
    const _detail = 'Regitro de producto exitoso!';
    const _ok = true;
    // dosen't mean anything just like me the emojin xd uwu: 👍
    this._triggerAndActionModal(_contentAdd, _content, _type, _detail, _ok);
  }
  //END **Functions button**

  //START ** Functions + **

  //_partProduct is a category,brand or size
  _generatePart(_partTitle: string, _partInput: string) {
    this._titleAdd = 'Registrar ' + _partTitle;
    this._placeHolderAdd = 'Ingrese ' + _partInput;
  }

  _loadDataModal(_partProduct: string) {
    _partProduct === 'brand'
      ? this._generatePart('Marca', 'marca')
      : _partProduct === 'category'
      ? this._generatePart('Categoría', 'categoría')
      : _partProduct === 'size'
      ? this._generatePart('Talla', 'talla')
      : null;
  }

  _exist(_list: any) {
    const _filtered = _list.filter((e: any) => {
      // const _pattern = new RegExp(this._ngModelAdd);
      // return _pattern.test(e._name);

      return e._name === this._ngModelAdd;
    });
    // console.log('result filtered: ', _filtered);
    // console.log('lenght: ', _filtered.length === 0 ? false : true);
    return _filtered.length === 0 ? false : true;
  }

  _existing() {
    // console.log('we are in existing: ', this._partProduct);
    return this._partProduct === 'brand'
      ? this._exist(this._brands)
      : this._partProduct === 'category'
      ? this._exist(this._categories)
      : this._partProduct === 'size'
      ? this._exist(this._sizes)
      : null;
  }

  _postBrand() {
    this._brandS._create(this._ngModelAdd).subscribe((e) => {
      console.log(e);
    });
    // console.log('posting brand');
  }

  _getBrands() {
    this._brandS._read().subscribe((e) => (this._brands = e));
  }

  _postCategory() {
    this._categoryS._create(this._ngModelAdd).subscribe((e) => {
      console.log(e);
    });
    // console.log('posting category');
  }

  _getCategories() {
    this._categoryS._read().subscribe((e) => (this._categories = e));
  }

  _postSize() {
    this._sizeS._create(this._ngModelAdd).subscribe((e) => console.log(e));
    // console.log('posting size');
  }

  _getSizes() {
    this._sizeS._read().subscribe((e) => (this._sizes = e));
  }

  _posting() {
    this._partProduct === 'brand'
      ? this._postBrand()
      : this._partProduct === 'category'
      ? this._postCategory()
      : this._partProduct === 'size'
      ? this._postSize()
      : null;
  }

  _getting() {
    this._partProduct === 'brand'
      ? this._getBrands()
      : this._partProduct === 'category'
      ? this._getCategories()
      : this._partProduct === 'size'
      ? this._getSizes()
      : null;
  }

  _add(_contentAdd: any, _content: any, _partProduct: string) {
    this._loadDataModal(_partProduct);
    this._triggerAddModal(_contentAdd, _content, _partProduct);
  }

  //END ** Function +  **

  //START ** Modal Msg**
  closeResult = '';

  _openModal(
    _contentAdd: any,
    _content: any,
    _ok: boolean,
    _workWithContentAdd: boolean
  ) {
    this._modalS
      .open(_content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
      })
      .result.then(
        (result) => {
          if (_workWithContentAdd) {
            this._triggerAddModal(_contentAdd, _content, this._partProduct);
          } else {
            if (result === 'yes') this._resetAll();
            if (result === 'ok') this._resetAll();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);

          if (_workWithContentAdd) {
            this._triggerAddModal(_contentAdd, _content, this._partProduct);
          } else {
            if (_ok) this._resetAll();
          }
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  _triggerAndActionModal(
    _contentAdd: any,
    _content: any,
    _type: string,
    _detail: string,
    _ok: boolean = false,
    _workWithContentAdd: boolean = false
  ) {
    this._msgS._setMsg({
      _type,
      _detail,
    });
    // console.log('ok: ',_workWithContentAdd);
    this._msg = this._msgS._getMsg();
    this._openModal(_contentAdd, _content, _ok, _workWithContentAdd);
  }
  //END ** Modal Msg**

  //START ** Modal Add **
  _convert(_partProduct: string) {
    return _partProduct === 'brand'
      ? 'marca'
      : _partProduct === 'size'
      ? 'talla'
      : _partProduct === 'category'
      ? 'categoría'
      : '';
  }

  _mngMsgModal(
    _contentAdd: any,
    _content: any,
    _detailSuccess: string,
    _detailError: string,
    _workWithContentAdd: boolean
  ) {
    if (this._existing()) {
      this._triggerAndActionModal(
        _contentAdd,
        _content,
        'error',
        _detailError,
        false,
        _workWithContentAdd
      );
    } else {
      //put here the posting()
      this._posting();
      this._triggerAndActionModal(
        _contentAdd,
        _content,
        'success',
        _detailSuccess,
        false,
        _workWithContentAdd
      );
    }
  }

  _triggerAddModal(_contentAdd: any, _content: any, _partProduct: string) {
    this._partProduct = _partProduct;
    console.log(this._partProduct);
    const _detailSuccess =
      'Se ha registrado la ' + this._convert(_partProduct) + ' exitosamente';
    const _detailError =
      'Ya existe la ' + this._convert(_partProduct) + '. Ingrese uno nuevo.';

    const _workWithContentAdd = true;
    this._modalS
      .open(_contentAdd, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
      })
      .result.then(
        (result) => {
          if (result === 'save') {
            // console.log(_workWithContentAdd);
            this._mngMsgModal(
              _contentAdd,
              _content,
              _detailSuccess,
              _detailError,
              _workWithContentAdd
            );
          }
          if (result === 'close') {
            this._getting();
            this._partProduct = '';
            this._ngModelAdd = '';
          }
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          // console.log(this.closeResult);
          this._partProduct = '';
          this._ngModelAdd = '';
          this._getting();
        }
      );
  }

  //END ** Modal Add **

  _ngModelAddInput(_event: any) {
    this._partProduct === 'brand'
      ? this._supportS.justLetters(_event)
      : this._partProduct === 'category'
      ? this._supportS.justLetters(_event)
      : this._partProduct === 'size'
      ? this._supportS._validateSizeProduct(_event)
      : false;
  }

  _getMax() {
    return this._partProduct === 'brand'
      ? 20
      : this._partProduct === 'category'
      ? 30
      : this._partProduct === 'size'
      ? 10
      : false;
  }

  _getMin() {
    return this._partProduct === 'brand'
      ? 3
      : this._partProduct === 'category'
      ? 5
      : this._partProduct === 'size'
      ? 1
      : false;
  }

  _activeBrand(): boolean {
    return this._ngModelAdd.length >= this._getMin() ? true : false;
  }

  _activeCategory(): boolean {
    return this._ngModelAdd.length >= this._getMin() ? true : false;
  }

  _activeSize(): boolean {
    return this._ngModelAdd.length >= this._getMin() ? true : false;
  }

  _activeBtnNgModelAdd(): boolean {
    return this._partProduct === 'brand'
      ? this._activeBrand()
      : this._partProduct === 'category'
      ? this._activeCategory()
      : this._partProduct === 'size'
      ? this._activeSize()
      : false;
  }
}
