import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_LOADING,
    LOGOUT_USER
} from '../constants/loginConstants';

import axios from 'axios';

import setAuthToken from '../../setAuthToken';


// as soon as app renders it checks for token , if present it will set authentication
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('/checkAuth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Login action
export const login = (username, password) => async dispatch => {
    dispatch({ type: LOGIN_LOADING })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }

    }
    const body = {
        username,
        password
    }
    try {
        const res = await axios.post('/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        // as soon as login is successfull then we are dispatching loaduser , it will set authentication of user
        dispatch(loadUser())
    }
    catch (error) {

        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
        setTimeout(() => {
            dispatch({ type: LOGIN_FAIL, payload: null })
        }, 3000)

    }

}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: LOGOUT_USER, payload: 'success' })
}