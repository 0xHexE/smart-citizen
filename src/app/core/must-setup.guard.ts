import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class MustSetupGuard implements CanActivate {
  constructor(
    private _afAuth: AngularFireAuth,
    private _afDatabase: AngularFireDatabase,
    private _router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = this._afAuth.auth.currentUser.uid;
      const userData = await new Promise<{ward: string, userType: string}>((resolve, reject) => {
        this._afDatabase
          .object('/users/' + user + '/meta')
          .valueChanges()
          .subscribe(v => resolve(v as any), e => reject(e))
      });
      if (!userData) {
        this._router.navigateByUrl('/core/setup');
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
