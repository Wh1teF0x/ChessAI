import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'

import './index.scss';
import './colors.scss';
import './chess.scss';
import getStore from './store'
import App from './Chess/app';
import * as serviceWorker from './serviceWorker';

const store = getStore();

render(
    <Provider store={store}>
        <noscript>Для работы приложения необходимо включить JavaScript</noscript>
        <App/>
    </Provider>,
    document.getElementsByTagName("body")[0]
);

serviceWorker.register();
