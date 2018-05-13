import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './js/store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render( <Provider store={ store }><App /></Provider>, document.getElementById( 'root' ));

registerServiceWorker();
