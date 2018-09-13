import { Action } from '@ngrx/store';
import { ISignUp } from '../../../common';

export enum SignUpActionTypes {
  SignUp = '[SignUp] Sign Up',
  SignUpSuccess = '[SignUp] Sign Up Success',
  SignUpFailure = '[SignUp] Sign Up Failure',
  SignUpScreenErrorReset = '[SignUp] Sign Up Screen Error Reset'

}

export class SignUp implements Action {
  readonly type = SignUpActionTypes.SignUp;
  constructor(public payload: ISignUp ) {}
}

export class SignUpSuccess implements Action {
  readonly type = SignUpActionTypes.SignUpSuccess;
}

export class SignUpFailure implements Action {
  readonly type = SignUpActionTypes.SignUpFailure;
  constructor(public payload: any) {}
}


export class SignUpScreenErrorReset implements Action {
  readonly type = SignUpActionTypes.SignUpScreenErrorReset;
}

export type SignUpActions = 
  SignUp
  | SignUpSuccess
  | SignUpFailure
  | SignUpScreenErrorReset;