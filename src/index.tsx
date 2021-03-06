import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const sessionId = window.localStorage.getItem('sessionId');

ReactDOM.render(<App sessionId={sessionId} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
