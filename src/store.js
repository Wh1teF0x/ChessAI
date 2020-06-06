import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './Reducers'


export default () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)));
}