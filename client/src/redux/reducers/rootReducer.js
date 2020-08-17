import { combineReducers } from 'redux';
import alert from './alert';

import login from './loginReducer';
import postdata from './postdata';


// this is root reducers the dispatch when triggered
//  it will first reaches to rootreducer and perform action accordingly
export default combineReducers({
    alert,
    login,
    postdata
})