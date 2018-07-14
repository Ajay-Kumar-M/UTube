import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<MainVid value="9sWEecNUW-o" />, document.getElementById('video'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
