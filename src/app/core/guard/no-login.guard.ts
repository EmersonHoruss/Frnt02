import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoLoginGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._auth._isAuthenticated()) {
      return true;
    } else {
      this._router.navigate(['/home']);
    }
    return false;
  }
}
