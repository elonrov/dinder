import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import axios from "axios"; // REMOVE IN PROD
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore({});
    const root = document.getElementById('root');
    window.axios = axios; // REMOVE IN PROD
    
    ReactDOM.render(<Root store={store}/>, root);
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
