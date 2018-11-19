import { createStore, applyMiddleware  } from "redux";
import thunkMiddleware from 'redux-thunk';

const defaultAppState = {

}

export const initStore = (initialState = defaultAppState) => {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
}

