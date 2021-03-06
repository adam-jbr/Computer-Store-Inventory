import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { computers } from './computers';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            computers
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}