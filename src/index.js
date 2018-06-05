import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import articleCreator from './component/admin/content/articleCreator';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, 
	document.getElementById('root')
	);
registerServiceWorker();
