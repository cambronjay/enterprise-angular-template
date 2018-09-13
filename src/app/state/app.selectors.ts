import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../../common';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromApplication from './app.reducers';

export interface State {
    application: fromApplication.State;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    application: fromApplication.reducer,
    routerReducer: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
// Application state
export const getApplicationState = createFeatureSelector<fromApplication.State>('application');
// Application selectors
export const getNetworkConnectionStatus = createSelector(getApplicationState, fromApplication.getNetworkConnectionStatus);

export const getSplashScreenStatus = createSelector(getApplicationState, fromApplication.getSplashScreenStatus);

export const getShowSidenav = createSelector(getApplicationState, fromApplication.getShowSidenav);