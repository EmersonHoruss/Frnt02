import { _productUris } from '../product.keys';

const _size = _productUris._size;

const _fGetReadByHeadquarter = (_idHeadquarter: string) => {
  return _size + '/headquarter/' + _idHeadquarter;
};

export const fullUris = {
  _create: _size,
  _read: _size,
  _readByHeadquarter: _fGetReadByHeadquarter,
};
