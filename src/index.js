import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Chess/chess';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Board/>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
