import { _productUris } from '../product.keys';

const _product = _productUris._product;

export const fullUris = {
  _create: _product,
  _read: _product,
  _createWithNoId: _product + '/createWithNoId',
  _readFull: _product + '/full'
};
