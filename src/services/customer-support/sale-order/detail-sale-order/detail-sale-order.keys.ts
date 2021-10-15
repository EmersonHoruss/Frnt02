import { _saleOrderUris } from '../sale-order.keys';

const _detailSaleOrder = _saleOrderUris._detailSaleOrder;

export const fullUris = {
  _create: _detailSaleOrder,
  _update: _detailSaleOrder,
  _readByIdSO: _detailSaleOrder + '/readByIdSaleOrder/',
  _readFullByIdSO: _detailSaleOrder + '/readFullByIdSaleOrder/',
  _deleteOneById: _detailSaleOrder + '/deleteOneById/'
};
