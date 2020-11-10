import React from 'react'
import Post from './Post'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom'




let store;
const mockStore = configureStore([])

beforeEach(() => {
    store = mockStore({
        ArticleWithId: {
            isLoading: false,
            errMess: false,
            article: {
                _id: "5f76ee043345420017facd41",
                title: " Tesla in talks with govt to set up research centre in Bengaluru.",
                by: "nitin",
                date: "10/31/2020, 8:27:43 PM",
                desc: "<p>adfasfadfasdfasdfsdafsa,  updated version</p>\n",
                imagename: "547df8e93036f63144f3445e705a50fc.jpg",
                category: "Technology",

            }
        }
    })
})

afterEach(cleanup)


function renderWithRedux(component) {
    return {
        ...render(<Provider store={store}><Router>{component}</Router></Provider>)
    }
}
describe('checking for the post page with individual id', () => {



    test('if params.id matches with article.id then dispatch is not called', async () => {
        store.dispatch = jest.fn()
        const wrapper = renderWithRedux(<Post match={{ params: { id: '5f76ee043345420017facd41' } }} />)


        expect(store.dispatch).toHaveBeenCalledTimes(0)




    })



    test('if params.id does not matches with article.id then dispatch is called', async () => {
        store.dispatch = jest.fn()
        const wrapper = renderWithRedux(<Post match={{ params: { id: '5f76ee043345420017facd43' } }} />)


        expect(store.dispatch).toHaveBeenCalledTimes(1)




    })



});
