import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/index';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// this is login reducer 
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {

        case LOGIN_SUCCESS:
            // if login is success we are storing the jwt token in localstorage
            // which we check for authentication in load user action
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,

            }
        case USER_LOADED:
            // if user is loaded the authentication is set to true and the user field consist of user details
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
            // if there is any error in logging in we remove the token from localstorage
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}