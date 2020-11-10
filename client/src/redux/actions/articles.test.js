import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios'
import { cleanup } from '@testing-library/react'
import {
    fetchArticleWithId,
    fetchArticles,
    categoryWise,
    byAuthor
} from './articles'
import {
    ARTICLES_LOADING,
    ARTICLES_SUCCESS,
    ARTICLES_ERROR,
    ARTICLE_WITH_ID_LOADING,
    ARTICLE_WITH_ID_SUCCESS,
    ARTICLE_WITH_ID_ERROR,
    CATEGORY_TYPE_LOADING,
    CATEGORY_TYPE_SUCCESS,
    CATEGORY_TYPE_ERROR,
    BY_AUTHOR_LOADING,
    BY_AUTHOR_SUCCESS,
    BY_AUTHOR_ERROR
} from '../constants/articleConstants';
import { response } from 'express';

const mockStore = configureStore([thunk])


jest.mock('axios')

let store

describe('testing fetchArticles actions', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('testing fetchArticles success action', () => {

        const response = {
            data: [{
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: 'some category'
            }, {
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: 'some category'
            }]
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(response))
        store.dispatch(fetchArticles()).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: ARTICLES_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: ARTICLES_SUCCESS, payload: [{
                    title: 'something',
                    desc: 'some description',
                    by: 'by someone',
                    date: 'some random date',
                    category: 'some category'
                }, {
                    title: 'something',
                    desc: 'some description',
                    by: 'by someone',
                    date: 'some random date',
                    category: 'some category'
                }]
            })
        })

    });

    test('tesing fetchArticles Error action', () => {
        const store = mockStore({})
        const rejectResponse = {
            message: 'Network Error'
        }
        axios.get.mockImplementationOnce(() => Promise.reject(rejectResponse))
        store.dispatch(fetchArticles()).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: ARTICLES_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: ARTICLES_ERROR, payload: 'Network Error'
            })
        })


    });



});


describe('testing ArticlesWithId action', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)

    test('ArticlesWithId action success ', () => {

        const id = '12345678'
        const response = {
            data: {
                _id: id,
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: 'some category'
            }
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(response))
        store.dispatch(fetchArticleWithId(id)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: ARTICLE_WITH_ID_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: ARTICLE_WITH_ID_SUCCESS, payload: {
                    _id: id,
                    title: 'something',
                    desc: 'some description',
                    by: 'by someone',
                    date: 'some random date',
                    category: 'some category'
                }
            })

        })

    });
    test('ArticlesWithId action error test ', () => {

        const id = '12345678'
        const response = {
            message: 'Article with provided Id not found'
        }
        axios.get.mockImplementationOnce(() => Promise.reject(response))
        store.dispatch(fetchArticleWithId(id)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: ARTICLE_WITH_ID_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: ARTICLE_WITH_ID_ERROR, payload: 'Article with provided Id not found'
            })


        })

    });

});

describe('tesing categoryWise action', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('categoryWise action success test', () => {
        const category = 'Sports'
        const response = {
            data: [{
                _id: '1233543565',
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: category

            }, {
                _id: '1233543565',
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: category

            }]
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(response))
        store.dispatch(categoryWise(category)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: CATEGORY_TYPE_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: CATEGORY_TYPE_SUCCESS, payload: [{
                    _id: '1233543565',
                    title: 'something',
                    desc: 'some description',
                    by: 'by someone',
                    date: 'some random date',
                    category: category

                }, {
                    _id: '1233543565',
                    title: 'something',
                    desc: 'some description',
                    by: 'by someone',
                    date: 'some random date',
                    category: category

                }], category: category
            })
        })

    });
    test('categoryWise action error test', () => {
        const category = 'Sports'
        const errResponse = {
            message: 'Invalid Category'
        }
        axios.get.mockImplementationOnce(() => Promise.reject(errResponse))
        store.dispatch(categoryWise(category)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: CATEGORY_TYPE_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: CATEGORY_TYPE_ERROR, payload: 'Invalid Category'
            })

        })

    });


});


describe('testing byAuthor action', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('byAuthor action success test', () => {
        const name = 'nitin'
        const response = {
            data: [{
                _id: '1233543565',
                title: 'something',
                desc: 'some description',
                by: name,
                date: 'some random date',
                category: 'Sports'

            }, {
                _id: '1233543565',
                title: 'something',
                desc: 'some description',
                by: name,
                date: 'some random date',
                category: 'Sports'

            }]
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(response))
        store.dispatch(byAuthor(name)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: BY_AUTHOR_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: BY_AUTHOR_SUCCESS, payload: [{
                    _id: '1233543565',
                    title: 'something',
                    desc: 'some description',
                    by: name,
                    date: 'some random date',
                    category: 'Sports'

                }, {
                    _id: '1233543565',
                    title: 'something',
                    desc: 'some description',
                    by: name,
                    date: 'some random date',
                    category: 'Sports'

                }], author: name
            })

        })

    });


    test('byAuthor action error test', () => {
        const name = 'nitin'
        const errResponse = {
            message: 'Invalid Author'
        }
        axios.get.mockImplementationOnce(() => Promise.reject(errResponse))
        store.dispatch(byAuthor(name)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: BY_AUTHOR_LOADING })
            expect(actionsCalled[1]).toEqual({
                type: BY_AUTHOR_ERROR, payload: 'Invalid Author'
            })

        })

    });

});



