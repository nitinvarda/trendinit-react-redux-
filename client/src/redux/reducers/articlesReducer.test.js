import { Articles, ArticleWithId } from './articlesReducer'
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
import { cleanup } from '@testing-library/react';

describe('articles reducer', () => {
    let state
    beforeEach(() => {
        state = {
            isLoading: true,
            page: 0,
            pages: 0,
            articles: [],
            errMess: null
        }
    })
    afterEach(cleanup)

    test('Should reutrn DEFAULT case incase of empty state and actions', () => {

        expect(Articles(state, {})).toEqual({
            isLoading: true,
            page: 0,
            pages: 0,
            articles: [],
            errMess: null
        })

    })

    test('Should return case ARTICLE_LOADING', () => {
        expect(Articles(state, { type: ARTICLES_LOADING })).toEqual({
            isLoading: true,
            page: 0,
            pages: 0,
            articles: [],
            errMess: null

        })

    });

    test('Should return case ARTICLE_SUCCESS', () => {
        expect(Articles(state, {
            type: ARTICLES_SUCCESS, payload: {
                articles: [{
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
                }], pages: 2, page: 1
            }
        })).toEqual({
            isLoading: false,
            page: 1,
            pages: 2,
            articles: [{
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
            }],
            errMess: null

        })

    });

    test('Should return case ARTICLES_ERROR', () => {
        expect(Articles(state, { type: ARTICLES_ERROR, payload: 'NetWork Error' }))
            .toEqual(
                {
                    isLoading: false,
                    page: 0,
                    pages: 0,
                    articles: [],
                    errMess: 'NetWork Error'
                })
    })
})

describe('testing ArticleWithId', () => {
    let state;
    beforeEach(() => {
        state = {
            isLoading: true,
            errMess: null,
            article: null
        }
    })
    afterEach(cleanup)
    test('testing DEFAULT state of articlesWithId', () => {
        expect(ArticleWithId(state, {}))
            .toEqual({
                isLoading: true,
                errMess: null,
                article: null
            })
    })

    test('testing ARTICLE_WITH_LOADING', () => {
        expect(ArticleWithId(state, { type: ARTICLE_WITH_ID_LOADING }))
            .toEqual({
                isLoading: true,
                errMess: null,
                article: null
            })
    })

    test('testing ARTICLE_WITH_ID_SUCCESS', () => {
        expect(ArticleWithId(state, {
            type: ARTICLE_WITH_ID_SUCCESS, payload: {
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: 'some category'
            }
        })).toEqual({
            isLoading: false,
            errMess: null,
            article: {
                title: 'something',
                desc: 'some description',
                by: 'by someone',
                date: 'some random date',
                category: 'some category'
            }
        })

    })

    test('tesing ARTICLE_WITH_ID_ERROR', () => {
        expect(ArticleWithId(state, {
            type: ARTICLE_WITH_ID_ERROR,
            payload: 'Network Error'
        })).toEqual({
            isLoading: false,
            errMess: 'Network Error',
            article: null
        })

    });


});

