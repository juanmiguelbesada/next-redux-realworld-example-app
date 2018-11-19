import { createStore, applyMiddleware, combineReducers  } from "redux";
import thunkMiddleware from 'redux-thunk';

import home from "./reducers/home"

const defaultAppState = {
    home: {}
}

export const initStore = (initialState = defaultAppState) => {
    return createStore(combineReducers({home}), initialState, applyMiddleware(thunkMiddleware));
}

