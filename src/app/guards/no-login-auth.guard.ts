import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class NoLoginAuthGuard implements CanActivate {
  constructor(
    private _auth: AngularFireAuth,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      this._auth.auth.onAuthStateChanged(user => {
        if (!user) {
          this._router.navigateByUrl('/ServiceLogin');
        }
        resolve(!!user)
      })
    })
  }
}
