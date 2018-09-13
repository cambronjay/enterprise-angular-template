import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/state/app.selectors';
import * as fromAuthentication from './login.reducers';

export interface AuthenticationState {
  status: fromAuthentication.State;
  loginScreen: fromAuthentication.State;
  
}

export interface State extends fromRoot.State {
  auth: AuthenticationState;
}

export const reducers = {
  status: fromAuthentication.reducer,
  loginScreen: fromAuthentication.reducer,
};

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const selectAuthStatusState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.status);

export const getLoggedIn = createSelector(selectAuthStatusState, fromAuthentication.getLoggedIn);

export const getUser = createSelector(selectAuthStatusState, fromAuthentication.getUser);

export const selectLoginScreenState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginScreen);

export const getLoginScreenError = createSelector(selectLoginScreenState, fromAuthentication.getError);

export const getLoginScreenPending = createSelector(selectLoginScreenState, fromAuthentication.getPending);