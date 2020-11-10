import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios'


import { loadUser, login, logout } from '../actions/Login'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_LOADING,
    LOGOUT_USER
}
    from '../constants/loginConstants';



const mockStore = configureStore([thunk])


jest.mock('axios')

describe('Testing Login,logout,loaduser actions ', () => {

    test('testing Login and loaduser actions', () => {
        const store = mockStore({

        })
        const user = {
            username: 'nitin',
            password: '12345678'
        }
        const response = {
            data: {
                token: '1233244594perhtahdfiludgfasbdnv',
                isAuthenticated: true

            }

        }
        const authResponse = {
            data: {
                user: {
                    name: 'nitin',
                    email: 'nitin@example.com'
                }
            }
        }
        axios.post.mockImplementationOnce(() => Promise.resolve(response))
        axios.get.mockImplementationOnce(() => Promise.resolve(authResponse))
        store.dispatch(login(user.username, user.password)).then((res) => {
            const actionsCalled = store.getActions()

            expect(actionsCalled[0]).toEqual({ type: LOGIN_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: LOGIN_SUCCESS, payload: {
                    token: '1233244594perhtahdfiludgfasbdnv',
                    isAuthenticated: true

                }
            })
            expect(actionsCalled[2]).toEqual({
                type: USER_LOADED, payload: { user: { email: "nitin@example.com", name: "nitin" } }
            })

        })



    });
    test('testing Error in Login action', () => {
        const store = mockStore({

        })
        const user = {
            username: 'nitin',
            password: '12345678'
        }
        const response = {
            message: 'Invalid Credentials'


        }

        axios.post.mockImplementationOnce(() => Promise.reject(response))

        store.dispatch(login(user.username, user.password)).then((res) => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: LOGIN_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: LOGIN_FAIL, payload: 'Invalid Credentials'
            })


        })



    });

    test('testing Error in LoadUser action', () => {
        const store = mockStore({

        })
        axios.get.mockImplementationOnce(() => Promise.reject())
        store.dispatch(loadUser()).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: AUTH_ERROR })

        })

    });


    test('test logout', () => {
        const store = mockStore([])
        store.dispatch(logout())
        const actions = store.getActions()
        expect(actions[0]).toEqual({ type: LOGOUT_USER, payload: 'success' })

    });



});