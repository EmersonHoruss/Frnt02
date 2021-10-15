import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  private _defaultMsgs = [
    { type: 'error', _icon: 'fas fa-times-circle fa-5x', _title: 'Oops...' },
    {
      type: 'warning',
      _icon: 'fas fa-exclamation-circle fa-5x',
      _title: '¿Estás seguro?',
    },
    {
      type: 'success',
      _icon: 'fas fa-thumbs-up fa-5x',
      _title: 'Buen trabajo! ☺',
    },
  ];

  private _msg = {
    _type: '',
    _icon: '',
    _title: '',
    _detail: '',
    _sureBtn: false,
  };

  constructor() {}

  _getMsg(reset = false) {
    return this._msg;
  }

  private _setIcon(type: any) {
    const _iconFromType = this._defaultMsgs.find((e) => e.type === type);
    const _justIcon = _iconFromType?._icon;
    this._msg._icon = typeof _justIcon === 'string' ? _justIcon : '';
  }

  private _setTitle(type: any) {
    const _titleFromType = this._defaultMsgs.find((e) => e.type === type);
    const _justTitle = _titleFromType?._title;
    this._msg._title = typeof _justTitle === 'string' ? _justTitle : '';
  }

  private _setSureBtn(type = false) {
    this._msg._sureBtn = type;
  }

  _setMsg(_msg: any) {
    const { _type, _icon, _title, _detail, _sureBtn } = _msg;
    this._msg._type = _type;
    this._msg._detail = _detail;
    this._setIcon(_type);
    this._setTitle(_type);
    this._setSureBtn(_sureBtn);
  }

  _resetMsg() {
    this._msg = {
      _type: '',
      _icon: '',
      _title: '',
      _detail: '',
      _sureBtn: false,
    };
  }
}

// INTERFACE MSG
// {
//   type: 'error' | 'warning' | 'success',
//   msg: '',
//   detail: '',
//   sureBtn: true | false
// }
