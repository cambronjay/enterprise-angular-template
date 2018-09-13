import { HomeActionTypes, HomeActions } from './home.actions';
import { IHome } from '../../../common';

export interface State {
    error: string | null;
    pending: boolean;
    stateData: IHome | null;
}

export const initialState: State = {
    error: null,
    pending: false,
    stateData: null
};

export function reducer(state = initialState, action: HomeActions): State {
    switch (action.type) {

        case HomeActionTypes.LoadHomeState: {
            return {
                ...state,
                error: null,
                pending: false
            };
        }

        case HomeActionTypes.LoadHomeStateSuccess: {
            return {
                error: null,
                pending: false,
                stateData: action.payload
            };
        }

        case HomeActionTypes.LoadHomeStateFail: {
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        }

        case HomeActionTypes.HomeScreenErrorReset: {
            return {
                ...state,
                error: null,
                pending: false
            };
        } 

        default: {
            return state;
        }
    }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getStateData = (state: State) => state.stateData;