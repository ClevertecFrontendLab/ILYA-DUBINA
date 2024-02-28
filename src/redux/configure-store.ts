import { configureStore } from '@reduxjs/toolkit';
import SignupSlice from './CleverfitSwaggerRegistrationAPI';
import LoginSlice from './CleverfitSwaggerAuthAPI';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        signup: SignupSlice,
        login: LoginSlice,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
