import { Action } from '@ngrx/store';
import { IHome } from '../../../common';

export enum HomeActionTypes {
  LoadHomeState = '[Home] Load Home State',
  LoadHomeStateSuccess = '[Home] Load Home State Success',
  LoadHomeStateFail = '[Home] Load Home State Fail',
  HomeScreenErrorReset = '[Home] Home Screen Error Reset'

}

export class LoadHomeState implements Action {
  readonly type = HomeActionTypes.LoadHomeState;
}

export class LoadHomeStateSuccess implements Action {
  readonly type = HomeActionTypes.LoadHomeStateSuccess;
  constructor(public payload: IHome ) {}
}

export class LoadHomeStateFail implements Action {
  readonly type = HomeActionTypes.LoadHomeStateFail;
  constructor(public payload: any) {}
}

export class HomeScreenErrorReset implements Action {
  readonly type = HomeActionTypes.HomeScreenErrorReset;
}

export type HomeActions = 
  LoadHomeState
  | LoadHomeStateSuccess
  | LoadHomeStateFail
  | HomeScreenErrorReset;