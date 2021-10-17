import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'invdanielito';

  constructor(private _authS: AuthService) {
    
  }

  _loadPage() {
    const _token = this._authS._getToken();
    console.log(_token);
    console.log(_token ? true : false);
    return _token ? true : false;
  }
}
