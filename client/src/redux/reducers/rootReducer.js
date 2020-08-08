import { combineReducers } from 'redux';
import alert from './alert';

import login from './loginReducer';
import postdata from './postdata';

export default combineReducers({
    alert,
    login,
    postdata
})