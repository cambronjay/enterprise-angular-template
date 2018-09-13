import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AuthenticationActions from '../../../screens/login/state/login.actions';
import * as fromAuthentication from '../../../screens/login/state/login.selectors';
import { IUserStatus } from '../../interfaces';
import { EnterpriseDataService } from '../data';

@Injectable()
export class SignUpGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromAuthentication.State>, private enterpriseDataService: EnterpriseDataService) { }

  canActivate(): Observable<boolean> {
    return Observable
    .fromPromise(this.enterpriseDataService.getRegisteredStatus())
    .map((status: IUserStatus) => {
      if (!status.pending && !status.approved) {
        // Not registered and not approved so they can see the registration screen
        return true;
      }
      this.store.dispatch(new AuthenticationActions.LoginRedirect());
      return false;
    })
    .take(1);
  }
  
  canLoad(): Observable<boolean> {
    return this.canActivate();
  }

}