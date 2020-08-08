import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import combineReducer from './redux/reducers/rootReducer';
import { crashReporter } from './redux/middlewares/middleware';


const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(createLogger, crashReporter, thunk)));
export default store;