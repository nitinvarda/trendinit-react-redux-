import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import combineReducer from './redux/reducers/rootReducer';



// this is global store for this entire app
// compose with devtools is devlopemnet tool 
const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(createLogger, thunk)));
export default store;