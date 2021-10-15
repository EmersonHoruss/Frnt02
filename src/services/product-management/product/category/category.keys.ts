import { _productUris } from '../product.keys';

const _category = _productUris._category;

const _fGetReadByHeadquarter = (_idHeadquarter: string) => {
  return _category + '/headquarter/' + _idHeadquarter;
};

export const fullUris = {
  _create: _category,
  _read: _category,
  _readByHeadquarter: _fGetReadByHeadquarter,
};
