import { _productUris } from '../product.keys';

const _brand = _productUris._brand;

const _fGetReadByHeadquarter = (_idHeadquarter: string) => {
  return _brand + '/headquarter/' + _idHeadquarter;
};

export const fullUris = {
  _create: _brand,
  _read: _brand,
  _readByHeadquarter: _fGetReadByHeadquarter,
};
