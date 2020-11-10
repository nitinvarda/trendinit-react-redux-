import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios'
import { cleanup } from '@testing-library/react'
import { postData, updateData, delData } from './PostData'
import {
    POST_DATA_LOADING,
    POST_DATA_SUCCESS,
    POST_DATA_ERROR,
    POST_DATA_UPDATE_LOADING,
    POST_DATA_UPDATE_SUCCESS,
    POST_DATA_UPDATE_ERROR,
    POST_DATA_DELETE_SUCCESS,
    POST_DATA_DELETE_ERROR,
    POST_DATA_DELETE_LOADING,

} from '../constants/postConstants';

const mockStore = configureStore([thunk])


jest.mock('axios')

let store
describe('tesitng postData actions ', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('postData actions success test', () => {
        const response = {
            data: 'success'
        }
        const post = {
            title: 'some title',
            by: 'somone',
            marked_desc: 'random description',
            category: 'random category',
            myImage: {
                imagename: 'random image',
                size: 794358,
                type: 'JEPG'
            }

        }
        axios.post.mockImplementationOnce(() => Promise.resolve(response))
        store.dispatch(postData(post)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_SUCCESS, payload: 'success' })


        })
    });


    test('postData actions error test', () => {
        const errResponse = {
            message: 'Network Fail'
        }
        const postToBeAdded = {
            title: 'some title',
            by: 'somone',
            marked_desc: 'random description',
            category: 'random category',
            myImage: {
                imagename: 'random image',
                size: 794358,
                type: 'JEPG'
            }

        }
        axios.post.mockImplementationOnce(() => Promise.reject(errResponse))
        store.dispatch(postData(postToBeAdded)).then(res => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_ERROR, payload: 'Network Fail' })


        })

    });



});



describe('tesitng updateData actions ', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('updateData action success test', () => {
        const successResponse = {
            data: 'success'

        }
        const postToBeUpdated = {
            title: 'some title',
            by: 'somone',
            marked_desc: 'random description',
            category: 'random category',
            myImage: {
                imagename: 'random image',
                size: 794358,
                type: 'JEPG'
            },
            date: 'random date'

        }
        axios.post.mockImplementationOnce(() => Promise.resolve(successResponse))
        store.dispatch(updateData(postToBeUpdated)).then(response => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_UPDATE_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_UPDATE_SUCCESS, payload: 'success' })

        })

    });
    test('updateData action error test', () => {
        const errResponse = {
            message: 'Updation Failed'

        }
        const postToBeUpdated = {
            title: 'some title',
            by: 'somone',
            marked_desc: 'random description',
            category: 'random category',
            myImage: {
                imagename: 'random image',
                size: 794358,
                type: 'JEPG'
            },
            date: 'random date'

        }
        axios.post.mockImplementationOnce(() => Promise.reject(errResponse))
        store.dispatch(updateData(postToBeUpdated)).then(async (response) => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_UPDATE_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_UPDATE_ERROR, payload: 'Updation Failed' })


        })

    });



})


describe('testing deleteData action', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    afterEach(cleanup)
    test('deleteData action success test', () => {
        const successResponse = {
            data: 'success'

        }
        const id = '1234567890'
        axios.delete.mockImplementationOnce(() => Promise.resolve(successResponse))
        store.dispatch(delData(id)).then((response) => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_DELETE_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_DELETE_SUCCESS, payload: 'success' })

        })

    });
    test('deleteData action error test', () => {
        const errResponse = {
            message: 'Deletion Failed'

        }
        const id = '1234567890'
        axios.delete.mockImplementationOnce(() => Promise.reject(errResponse))
        store.dispatch(delData(id)).then((response) => {
            const actionsCalled = store.getActions()
            expect(actionsCalled[0]).toEqual({ type: POST_DATA_DELETE_LOADING })
            expect(actionsCalled[1]).toEqual({ type: POST_DATA_DELETE_ERROR, payload: 'Deletion Failed' })

        })

    });


});

