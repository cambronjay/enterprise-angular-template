import { Action } from '@ngrx/store';

export enum AppActionTypes {
  OpenSidenav = '[Application] Open Sidenav',
  CloseSidenav = '[Application] Close Sidenav',
  CheckNetworkConnection = '[Application] Check Network Connection',
  UpdateNetworkConnectionStatus = '[Application] Update Network Connection Status',
  UpdateSplashScreenStatus = '[Application] Update Splash Screen Status'
}

export class OpenSidenav implements Action {
  readonly type = AppActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = AppActionTypes.CloseSidenav;
}

export class CheckNetworkConnection implements Action {
  readonly type = AppActionTypes.CheckNetworkConnection;
}

export class UpdateNetworkConnectionStatus implements Action {
  readonly type = AppActionTypes.UpdateNetworkConnectionStatus;
  constructor(public payload: boolean) {}
}

export class UpdateSplashScreenStatus implements Action {
  readonly type = AppActionTypes.UpdateSplashScreenStatus;
  constructor(public payload: boolean) {}
}


export type AppActions = 
    OpenSidenav 
    | CloseSidenav
    | CheckNetworkConnection 
    | UpdateNetworkConnectionStatus
    | UpdateSplashScreenStatus;