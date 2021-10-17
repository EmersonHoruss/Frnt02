import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(): boolean {
    // console.log('XXXXXXXX', this._auth._isAuthenticated());
    if (this._auth._isAuthenticated()) {
      return true;
    } else {
      this._router.navigate(['/login']);
    }
    return false;
  }
}
