import React from 'react'
import ByAdmin from './byAdmin'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom'
import { BY_AUTHOR_LOADING } from '../../../../redux/constants/articleConstants';
import { byAuthor } from '../../../../redux/actions/articles'




let store;
const mockStore = configureStore([])

beforeEach(() => {
    store = mockStore({
        ByAuthor: {
            ByAuthorData: [{
                _id: '1',
                title: " Tesla in talks with govt to set up research centre in Bengaluru.",
                by: "nitin",
                date: "10/31/2020, 8:27:43 PM",
                desc: "<p>adfasfadfasdfasdfsdafsa,  updated version</p>\n",
                imagename: "547df8e93036f63144f3445e705a50fc.jpg",
                category: "Technology",

            }, {
                _id: '2',
                title: " This is another post we see here.",
                by: "nitin",
                date: "10/31/2020, 8:27:43 PM",
                desc: "<p>This is the description of the post </p>\n",
                imagename: "547df8e93036f63144f3445e705a50fc.jpg",
                category: "Sports",

            }],
            isLoading: false,
            errMess: null,
            author: 'nitin'

        }
    })
})

afterEach(cleanup)


function renderWithRedux(component) {
    return {
        ...render(<Provider store={store}><Router>{component}</Router></Provider>)
    }
}

describe('Checking by admin articles render', () => {

    test('when params.name and article.name matches it wont dispatch', async () => {
        store.dispatch = jest.fn()
        const wrapper = renderWithRedux(<ByAdmin match={{ params: { name: 'nitin' } }} />)


        expect(store.dispatch).toHaveBeenCalledTimes(0)




    })
    test('when params.name and article.name doesn\'t matche it will dispatch with new action', async () => {
        store.dispatch = jest.fn()
        const wrapper = renderWithRedux(<ByAdmin match={{ params: { name: 'raghu' } }} />)


        expect(store.dispatch).toHaveBeenCalledTimes(1)





    })
});

