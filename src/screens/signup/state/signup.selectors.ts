import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/state/app.selectors';
import * as fromSignUp from './signup.reducers';

export interface SignupState {
  stateData: fromSignUp.State;
}

export interface State extends fromRoot.State {
  signup: SignupState;
}

export const reducers = {
  stateData: fromSignUp.reducer
};

export const selectSignupState = createFeatureSelector<SignupState>('signup');

export const selectSignupStateData = createSelector(selectSignupState, (state: SignupState) => state.stateData);

export const getSignupScreenError = createSelector(selectSignupStateData, fromSignUp.getError);

export const getSignupScreenPending = createSelector(selectSignupStateData, fromSignUp.getPending);