import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/state/app.selectors';
import * as fromHome from './home.reducers';

export interface HomeState {
  stateData: fromHome.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers = {
  stateData: fromHome.reducer
};

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectHomeStateData = createSelector(selectHomeState, (state: HomeState) => state.stateData);

export const getHomeState = createSelector(selectHomeStateData, fromHome.getStateData);

export const getHomeScreenError = createSelector(selectHomeStateData, fromHome.getError);

export const getHomeScreenPending = createSelector(selectHomeStateData, fromHome.getPending);