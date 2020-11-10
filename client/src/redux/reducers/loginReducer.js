import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_LOADING, LOGOUT_USER } from '../constants/loginConstants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
    errMess: null,
    logout: null
}

// this is login reducer 
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case LOGIN_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case LOGIN_SUCCESS:
            // if login is success we are storing the jwt token in localstorage
            // which we check for authentication in load user action
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false


            }
        case USER_LOADED:
            // if user is loaded the authentication is set to true and the user field consist of user details
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
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
                isLoading: false,
                errMess: payload
            }
        case LOGOUT_USER:
            return {
                token: null,
                isAuthenticated: false,
                user: null,
                isLoading: false,
                errMess: null,
                logout: payload
            }
        default:
            return state;
    }
}