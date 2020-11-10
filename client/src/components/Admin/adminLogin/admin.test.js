import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Admin from './admin'
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { login } from '../../../redux/actions/Login'


let store;

const mockStore = configureStore([thunk])

beforeEach(() => {
    store = mockStore({
        login: {
            isAuthenticated: false,
            isLoading: false,
            user: null,
            errMess: true
        }
    })
})

afterEach(cleanup)

function renderWithRedux(component) {
    return {
        ...render(<Provider store={store}><Router>{component}</Router></Provider>)
    }
}



describe('checking admin login component page', () => {



    test('testing username input changes of the login form fields', () => {
        const wrapper = renderWithRedux(<Admin />)
        fireEvent.change(wrapper.getByTestId('username'), { target: { value: 'nitin' } })

        expect(wrapper.getByTestId('username').value).toBe('nitin')
        expect(wrapper.getByTestId('username').value).not.toBe('niti')

    });

    test('testing username input changes of the login form fields', () => {
        const wrapper = renderWithRedux(<Admin />)
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '12345678' } })

        expect(wrapper.getByTestId('password').value).toBe('12345678')
        expect(wrapper.getByTestId('password').value).not.toBe('1234567')

    });


    test('testing button value', () => {
        store.dispatch = jest.fn()

        const wrapper = renderWithRedux(<Admin />)

        fireEvent.change(wrapper.getByTestId('username'), { target: { value: 'nitin' } })
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '12345678' } })
        fireEvent.click(wrapper.getByTestId('button'))

        expect(store.dispatch).toHaveBeenCalledTimes(1)


    })



});















