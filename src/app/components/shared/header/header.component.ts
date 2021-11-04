import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  _headquarterName = 'La Central Arica #1018 stand 63';
  // _userHeadquarterName = 'Julia Martinez'

  constructor(private _authS: AuthService) {}

  ngOnInit(): void {}

  _loged() {
    return this._authS._isAuthenticated();
  }

  _headquarter() {
    const _dataUser: any = localStorage.getItem('_dataUser');
    const _dataUserObject: any = JSON.parse(_dataUser);
    const _hq = _dataUserObject._headquarter;
    return (
      _hq._address + ' en el ' + _hq._flat + ' piso stand N° ' + _hq._stand
    );
  }
}
