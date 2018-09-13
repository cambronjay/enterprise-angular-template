import { AppActionTypes, AppActions } from './app.actions';
export interface State {
    showSidenav: boolean;
    networkConnected: boolean;
    showSplashScreen: boolean;
}

const initialState: State = {
    showSidenav: false,
    networkConnected: false,
    showSplashScreen: true
};

export function reducer(state: State = initialState, action: AppActions): State {
    switch (action.type) {
        case AppActionTypes.CloseSidenav: {
            return {
                ...state,
                showSidenav: false
            };
        }

        case AppActionTypes.OpenSidenav: {
            return {
                ...state,
                showSidenav: true
            };
        }

        case AppActionTypes.UpdateNetworkConnectionStatus: {
            return {
                ...state,
                networkConnected: action.payload
            };
        }

        case AppActionTypes.UpdateSplashScreenStatus: {
            return {
                ...state,
                showSplashScreen: action.payload
            };
        }           

        default: {
            return state;
        }
    }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getNetworkConnectionStatus = (state: State) => state.networkConnected;
export const getSplashScreenStatus = (state: State) => state.showSplashScreen;