import { _productUris } from '../price.keys';

const _kindPrice = _productUris._kindPrice;

const _fGetReadByHeadquarter = (_kindPrice: string) => {
  return _kindPrice + '/kindPrice/' + _kindPrice;
};

export const fullUris = {
  _create: _kindPrice,
  _read: _kindPrice,
  _readByHeadquarter: _fGetReadByHeadquarter,
};
