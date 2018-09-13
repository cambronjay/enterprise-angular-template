import { AuthenticationActionTypes, AuthenticationActions } from './login.actions';
import { IUserAuth } from '../../../common';

export interface State {
    error: string | null;
    pending: boolean;
    loggedIn: boolean;
    user: IUserAuth | null;
}

export const initialState: State = {
    error: null,
    pending: false,
    loggedIn: false,
    user: null
};

export function reducer(state = initialState, action: AuthenticationActions): State {
    switch (action.type) {

        case AuthenticationActionTypes.LoadAuthenticationState: {
            return {
                ...state,
                error: null,
                pending: false,
                loggedIn: false
            };
        }

        case AuthenticationActionTypes.LoadAuthenticationStateSuccess: {
            return {
                error: null,
                pending: false,
                loggedIn: false,
                user: action.payload
            };
        }

        case AuthenticationActionTypes.LoadAuthenticationStateFail: {
            return {
                ...state,
                error: action.payload,
                loggedIn: false,
                pending: false
            };
        }

        case AuthenticationActionTypes.Login: 
        case AuthenticationActionTypes.GoogleLogin: {
            return {
                ...state,
                error: null,
                pending: true
            };
        }

        case AuthenticationActionTypes.AuthenticationRedirect: {
            return {
                ...state,
                error: null,
                pending: false,
                loggedIn: true,
            };
        }

        case AuthenticationActionTypes.LoginSuccess: {
            return {
                ...state,
                error: null,
                pending: false,
                loggedIn: true,
                user: action.payload
            };
        }

        case AuthenticationActionTypes.RegisterGoogle: {
            return {
                ...state,
                error: null,
                loggedIn: false,
                pending: false
            };
        }

        case AuthenticationActionTypes.LoginFailure: {
            return {
                ...state,
                error: action.payload,
                loggedIn: false,
                pending: false
            };
        }

        case AuthenticationActionTypes.LoginErrorReset: {
            return {
                ...state,
                error: null,
                pending: false
            };
        }        

        case AuthenticationActionTypes.Logout: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;