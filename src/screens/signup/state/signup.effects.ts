import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/of';
import { SignUp, SignUpFailure, SignUpSuccess, SignUpActionTypes } from './signup.actions';
import { ISignUp, AuthenticationService } from '../../../common';

@Injectable()
export class SignUpEffects {

  @Effect()
  signup$: Observable<Action> = this.actions$
    .ofType(SignUpActionTypes.SignUp)
    .map((action: SignUp) => action.payload)
    .exhaustMap(formData => 
      this.authService
        .signUp(formData)
        .map((data) => new SignUpSuccess())
        .catch(error => Observable.of(new SignUpFailure(error)))
    );

  @Effect({ dispatch: false })
  signupSuccess$: Observable<Action> = this.actions$
    .ofType(SignUpActionTypes.SignUpSuccess)
    .do(() => this.router.navigate(['/pending']))

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthenticationService
  ) { }
}