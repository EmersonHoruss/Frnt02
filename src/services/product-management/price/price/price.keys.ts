import { _productUris } from '../price.keys';

const _price = _productUris._price;

const _fGetFullPricesByIdProduct = (_idProduct: string) => {
  return _price + '/readFullPricesByIdProduct/' + _idProduct;
};

const _fUpdateById = (_idPrice: string) => {
  return _price + '/updateById/' + _idPrice;
};

export const fullUris = {
  _create: _price,
  _createMultiple: _price + '/multiple',
  _read: _price,
  _updateById: _fUpdateById,
  _fullPricesByIdProduct: _fGetFullPricesByIdProduct,
};
