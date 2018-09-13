import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AuthenticationActions from '../../../screens/login/state/login.actions';
import * as fromAuthentication from '../../../screens/login/state/login.selectors';
import { IUserStatus } from '../../interfaces';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromAuthentication.State>) { }

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuthentication.getLoggedIn)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new AuthenticationActions.LoginRedirect());
          return false;
        }

        return true;
      })
      .take(1);
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }

}