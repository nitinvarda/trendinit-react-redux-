import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'

import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Addpost from './add';
import { createMemoryHistory } from 'history'


const mockStore = configureStore([thunk])

describe('testing  add post ', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                isAuthenticated: false,
                isLoading: false,
                user: null,
                errMess: true
            },
            AddPost: {
                isLoading: true,
                errMess: null,
                postStatus: null
            }
        })
    })

    afterEach(cleanup)

    function renderWithRedux(component, { route = '/add', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
        return {
            ...render(<Provider store={store}><Router history={history}>{component}</Router></Provider>), history,
        }
    }

    test('testing addpost ', () => {
        const { history } = renderWithRedux(<Addpost />)
        // after authentication fails by default /add page redirects to /admin
        expect(history.location.pathname).toEqual('/admin')

    });


});


describe('testing  add post ', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                isAuthenticated: true,
                isLoading: false,
                user: null,
                errMess: true
            },
            AddPost: {
                isLoading: true,
                errMess: null,
                postStatus: null
            }
        })
    })

    afterEach(cleanup)

    function renderWithRedux(component, { route = '/add', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
        return {
            ...render(<Provider store={store}><Router history={history}>{component}</Router></Provider>), history,
        }
    }

    test('testing addpost ', () => {
        const { history } = renderWithRedux(<Addpost />)

        expect(history.location.pathname).toEqual('/add')



    });


});
