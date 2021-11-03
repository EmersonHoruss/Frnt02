import { _distributionUris } from '../distribution.keys';

const _productHUri = _distributionUris._productHeadquarter;

const _fGetReadByBrandCategorySize = (
  _headquarter: string,
  _brand: string,
  _category: string,
  _size: string
) => {
  return (
    _productHUri +
    '/readByBrandCategorySize/' +
    _headquarter +
    '/' +
    _brand +
    '/' +
    _category +
    '/' +
    _size
  );
};

const _fUpdateById = (_idProductH: string) => {
  return _productHUri + '/updateById/' + _idProductH;
};

export const fullUris = {
  _create: _productHUri,
  _createMultiple: _productHUri + '/multiple',
  _readByBrandCategorySize: _fGetReadByBrandCategorySize,
  _read: _productHUri,
  _updateById: _fUpdateById,
  _readFull: _productHUri + '/full/',
};
