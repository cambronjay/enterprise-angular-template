import { SignUpActionTypes, SignUpActions } from './signup.actions';
import { ISignUp } from '../../../common';

export interface State {
    error: string | null;
    pending: boolean;
}

export const initialState: State = {
    error: null,
    pending: false
};

export function reducer(state = initialState, action: SignUpActions): State {
    switch (action.type) {

        case SignUpActionTypes.SignUp: {
            return {
                ...state,
                error: null,
                pending: true
            };
        }

        case SignUpActionTypes.SignUpSuccess: {
            return {
                ...state,
                error: null,
                pending: false,
            };
        }

        case SignUpActionTypes.SignUpFailure: {
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        }

        case SignUpActionTypes.SignUpScreenErrorReset: {
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