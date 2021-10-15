import { _saleOrderUris } from '../sale-order.keys';

const _clientURI = _saleOrderUris._client;

const _fGetReadByNameDNI = (_name: string, _DNI: string) => {
  return _clientURI + '/readByNameDNI/' + _name + '/' + _DNI;
};

export const fullUris = {
  _create: _clientURI,
  _update: _clientURI + '/',
  _readByNameDNI: _fGetReadByNameDNI,
  _read: _clientURI,
};
