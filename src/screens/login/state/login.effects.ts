import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/of';
import { Database } from '@ngrx/db';
import { AuthenticationService, IUserAuth } from '../../../common';
import { Login, GoogleLogin, LoginNavigate, RegisterGoogle, LoginSuccess, LoginFailure, Logout, AuthenticationRedirect, LoadAuthenticationState, LoadAuthenticationStateSuccess, LoadAuthenticationStateFail, AuthenticationActionTypes } from './login.actions';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  loadAuthenticationState$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.LoadAuthenticationState)
    .startWith(new LoadAuthenticationState())
    .switchMap(() =>
      this.db.query('authentication')
        .map((authentication: IUserAuth) => new LoadAuthenticationStateSuccess(authentication))
        .catch(error => Observable.of(new LoadAuthenticationStateFail(error)))
    );

  @Effect()
  loadAuthenticationStateSucces$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.LoadAuthenticationStateSuccess)
    .map((action: LoadAuthenticationStateSuccess) => action.payload)
    .exhaustMap(user =>
      this.authService
        .checkAuthentication(user)
        .map(authed => new AuthenticationRedirect())
        .catch(error => Observable.of(new LoadAuthenticationStateFail(error)))
    );

  @Effect({ dispatch: false })
  authenticationRedirect$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.AuthenticationRedirect)
    .do(authed => this.router.navigate(['/']));


  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.Login)
    .map((action: Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map((user: IUserAuth) => new LoginSuccess(user))
        .catch(error => Observable.of(new LoginFailure(error)))
    );

  @Effect()
  googleLogin$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.GoogleLogin)
    .map((action: GoogleLogin) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .googleLogin(auth)
        .map((user: IUserAuth) => new LoginSuccess(user))
        .catch(error => Observable.of(new RegisterGoogle()))
    );

  @Effect()
  registerGoogle$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.RegisterGoogle)
    .map(user => new LoginNavigate());

  @Effect({ dispatch: false })
  loginNavigate$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.LoginNavigate)
    .do(nav => this.router.navigate(['/signup']));

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.LoginSuccess)
    .map((action: LoginSuccess) => action.payload)
    .switchMap(user =>
      this.db.insert('authentication', [user])
        .do(() => this.router.navigate(['/']))
        .catch(error => Observable.of(new LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginRedirect$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.LoginRedirect)
    .do(authed => this.router.navigate(['/login']));

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$
    .ofType(AuthenticationActionTypes.Logout)
    .map((action: Logout) => action.payload)
    .switchMap(user =>
      this.db.executeWrite('authentication', 'delete', [user.id])
        .catch(error => Observable.of(new LoginFailure(error)))
    )
    .do(authed => {
      this.router.navigate(['/login']);
    });


  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private db: Database
  ) { }
}