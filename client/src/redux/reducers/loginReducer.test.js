import Login from './loginReducer';
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_USER
} from '../constants/loginConstants';
import { cleanup } from '@testing-library/react'

describe('testing login reducer', () => {
    let state;
    beforeEach(() => {
        state = {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            isLoading: true,
            user: null,
            errMess: null,
            logout: null
        }
    })
    afterEach(cleanup)

    test('tesing Login reducer default functionality', () => {
        expect(Login(state, {}))
            .toEqual({
                token: localStorage.getItem('token'),
                isAuthenticated: null,
                isLoading: true,
                user: null,
                errMess: null,
                logout: null

            })

    });

    test('testing LOGIN_LOADING', () => {
        expect(Login(state, { type: LOGIN_LOADING }))
            .toEqual({
                token: localStorage.getItem('token'),
                isAuthenticated: null,
                isLoading: true,
                user: null,
                errMess: null,
                logout: null
            })

    });

    test('tesing LOGIN_SUCCESS', () => {
        expect(Login(state, { type: LOGIN_SUCCESS, payload: { token: '1234567890' } }))
            .toEqual({
                token: '1234567890',
                isAuthenticated: true,
                isLoading: false,
                user: null,
                errMess: null,
                logout: null
            })
    });

    test('testing USER_LOADED', () => {
        expect(Login(state, { type: USER_LOADED, payload: { _id: '12345', name: 'nitin', email: 'nitin@exmaple.com' } }))
            .toEqual({
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                isLoading: false,
                user: {
                    _id: '12345',
                    name: 'nitin',
                    email: 'nitin@exmaple.com'
                },
                errMess: null,
                logout: null
            })
    })

    test('testing LOGIN_FAIL', () => {
        expect(Login(state, { type: LOGIN_FAIL, payload: 'Invalid Credentials' }))
            .toEqual({
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                errMess: 'Invalid Credentials',
                logout: null
            })

    })

    test('testing AUTH_ERROR', () => {
        expect(Login(state, { type: AUTH_ERROR, payload: 'Authorization Failed' }))
            .toEqual({
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                errMess: 'Authorization Failed',
                logout: null
            })

    })

    test('tesing LOGOUT_USER', () => {
        expect(Login(state, { type: LOGOUT_USER, payload: 'success' }))
            .toEqual({
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                errMess: null,
                logout: 'success'
            })

    });



});
