import { Action } from '@ngrx/store';
import { IUserAuth, ILogin, IGoogleLogin } from '../../../common';

export enum AuthenticationActionTypes {
  LoginNavigate = '[Authentication] Navigation Success',
  Login = '[Authentication] Login',
  GoogleLogin = '[Authentication] Google Login',
  RegisterGoogle = '[Authentication] Register Google',
  Logout = '[Authentication] Logout',
  LoginSuccess = '[Authentication] Login Success',
  LoginFailure = '[Authentication] Login Failure',
  LoginRedirect = '[Authentication] Login Redirect',
  LoadAuthenticationState = '[Authentication] Load Authentication State',
  LoadAuthenticationStateSuccess = '[Authentication] Load Authentication State Success',
  AuthenticationRedirect = '[Authentication] Checked Stored Authentication Success',
  LoadAuthenticationStateFail = '[Authentication] Load Authentication State Fail',
  LoginErrorReset = '[Authentication] Login Error Reset'
}

export class LoadAuthenticationState implements Action {
  readonly type = AuthenticationActionTypes.LoadAuthenticationState;
}

export class LoadAuthenticationStateSuccess implements Action {
  readonly type = AuthenticationActionTypes.LoadAuthenticationStateSuccess;
  constructor(public payload: IUserAuth) {}
}

export class LoadAuthenticationStateFail implements Action {
  readonly type = AuthenticationActionTypes.LoadAuthenticationStateFail;
  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = AuthenticationActionTypes.Login;
  constructor(public payload: ILogin) {}
}

export class GoogleLogin implements Action {
  readonly type = AuthenticationActionTypes.GoogleLogin;
  constructor(public payload: IGoogleLogin) {}
}

export class RegisterGoogle implements Action {
  readonly type = AuthenticationActionTypes.RegisterGoogle;
}


export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LoginSuccess;
  constructor(public payload: IUserAuth ) {}
}

export class LoginNavigate implements Action {
  readonly type = AuthenticationActionTypes.LoginNavigate;
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LoginFailure;
  constructor(public payload: any) {}
}

export class LoginErrorReset implements Action {
  readonly type = AuthenticationActionTypes.LoginErrorReset;
}

export class AuthenticationRedirect implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationRedirect;
}

export class LoginRedirect implements Action {
  readonly type = AuthenticationActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthenticationActionTypes.Logout;
  constructor(public payload: IUserAuth) {}
}

export type AuthenticationActions = 
  LoadAuthenticationState
  | LoadAuthenticationStateSuccess
  | LoadAuthenticationStateFail
  | AuthenticationRedirect
  | Login
  | GoogleLogin
  | RegisterGoogle
  | LoginSuccess
  | LoginFailure
  | LoginErrorReset
  | LoginRedirect
  | LoginNavigate
  | Logout;