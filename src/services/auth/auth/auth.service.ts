import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { general } from '../../general.keys';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _urlMain = general._mainUri;
  private _urlLogin = this._urlMain + '/login';
  private _accessToken = '';

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  _login(_user: any) {
    console.log(this._urlLogin);

    return this._httpClient.post(this._urlLogin, _user).pipe(
      map((resp: any) => {
        console.log('jjjjjjjjjjjjj', resp);
        this._saveToken(resp.dataUser._accessToken);
        this._saveDataUser(resp.dataUser);
        return resp;
      })
      // catchError((error)=>{})
    );
  }

  _logout() {
    localStorage.removeItem('_accessToken');
    this._router.navigate(['/login']);
  }

  private _saveDataUser(_dataUser: any) {
    // localStorage.setItem('_nickname', _dataUser._nickname);
    // localStorage.setItem('_kindUser', _dataUser._kindUserName);
    localStorage.setItem('_dataUser', JSON.stringify(_dataUser));
  }

  private _saveToken(_idToken: string) {
    this._accessToken = _idToken;
    localStorage.setItem('_accessToken', this._accessToken);
  }

  _getToken(): string {
    const _accessToken = localStorage.getItem('_accessToken');
    const _returnedToken = _accessToken ? _accessToken : '';
    return _returnedToken;
  }

  _isAuthenticated(): boolean {
    const _accessToken = localStorage.getItem('_accessToken');
    // console.log(_accessToken);
    return _accessToken ? true : false;
  }
}
