import React from 'react'
import Category from './categories'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom'




let store;
const mockStore = configureStore([])

beforeEach(() => {
    store = mockStore({
        CategoryType: {
            isLoading: false,
            errMess: null,
            category: 'Technology',
            CategoryTypeData: [{
                title: " Tesla in talks with govt to set up research centre in Bengaluru.",
                by: "nitin",
                date: "10/31/2020, 8:27:43 PM",
                desc: "<p>adfasfadfasdfasdfsdafsa,  updated version</p>\n",
                imagename: "547df8e93036f63144f3445e705a50fc.jpg",
                category: "Technology",

            }]
        }
    })
})

afterEach(cleanup)


function renderWithRedux(component) {
    return {
        ...render(<Provider store={store}><Router>{component}</Router></Provider>)
    }
}

test('checking post articles render', async () => {
    store.dispatch = jest.fn()
    const wrapper = renderWithRedux(<Category match={{ params: { type: 'Technolgoy' } }} />)


    expect(store.dispatch).toHaveBeenCalledTimes(1)



})