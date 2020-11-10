import { AddPost, UpdatePost, DeletePost } from './postdata'
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
    REMOVE_ADD_STATUS,
    REMOVE_UPDATE_STATUS,
    REMOVE_DELETE_STATUS
} from '../constants/postConstants';
import { cleanup } from '@testing-library/react'

describe('testing AddPost reducer', () => {
    let state;
    beforeEach(() => {
        state = {
            isLoading: true,
            errMess: null,
            postStatus: null,
        }
    })
    afterEach(cleanup)

    test('testing default case of AddPost', () => {
        expect(AddPost(state, {}))
            .toEqual({
                isLoading: true,
                errMess: null,
                postStatus: null,
            })

    });

    test('testing case POST_DATA_LOADING', () => {
        expect(AddPost(state, { type: POST_DATA_LOADING }))
            .toEqual({
                isLoading: true,
                errMess: null,
                postStatus: null,

            })

    });

    test('testing case POST_DATA_SUCCESS', () => {
        expect(AddPost(state, { type: POST_DATA_SUCCESS, payload: 'success' }))
            .toEqual({
                isLoading: false,
                errMess: null,
                postStatus: 'success',
            })

    });

    test('testing case POST_DATA_ERROR', () => {

        expect(AddPost(state, { type: POST_DATA_ERROR, payload: 'Network Error' }))
            .toEqual({
                isLoading: false,
                errMess: 'Network Error',
                postStatus: null,
            })

    });

    test('testing case REMOVE_ADD_STATUS', () => {
        expect(AddPost(state, { type: REMOVE_ADD_STATUS }))
            .toEqual({
                isLoading: true,
                errMess: null,
                postStatus: null,
            })

    });

});


describe('testing UpdatePost', () => {
    let state;
    beforeEach(() => {
        state = {
            isLoading: true,
            errMess: null,
            updateStatus: null

        }
    })
    afterEach(cleanup)

    test('testing default case of UpdatePost', () => {
        expect(UpdatePost(state, {}))
            .toEqual({
                isLoading: true,
                errMess: null,
                updateStatus: null,
            })

    });

    test('testing case POST_DATA_UPDATE_LOADING', () => {
        expect(UpdatePost(state, { type: POST_DATA_UPDATE_LOADING }))
            .toEqual({
                isLoading: true,
                errMess: null,
                updateStatus: null,

            })

    });

    test('testing case POST_DATA_UPDATE_SUCCESS', () => {
        expect(UpdatePost(state, { type: POST_DATA_UPDATE_SUCCESS, payload: 'success' }))
            .toEqual({
                isLoading: false,
                errMess: null,
                updateStatus: 'success',
            })

    });

    test('testing case POST_DATA_UPDATE_ERROR', () => {

        expect(UpdatePost(state, { type: POST_DATA_UPDATE_ERROR, payload: 'Network Error' }))
            .toEqual({
                isLoading: false,
                errMess: 'Network Error',
                updateStatus: null,
            })

    });

    test('testing case REMOVE_UPDATE_STATUS', () => {
        expect(UpdatePost(state, { type: REMOVE_UPDATE_STATUS }))
            .toEqual({
                isLoading: true,
                errMess: null,
                updateStatus: null,
            })

    });



});


describe('testing UpdatePost', () => {
    let state;
    beforeEach(() => {
        state = {
            isLoading: true,
            errMess: null,
            deleteStatus: null

        }
    })
    afterEach(cleanup)

    test('testing default case of UpdatePost', () => {
        expect(DeletePost(state, {}))
            .toEqual({
                isLoading: true,
                errMess: null,
                deleteStatus: null,
            })

    });

    test('testing case POST_DATA_DELETE_LOADING', () => {
        expect(DeletePost(state, { type: POST_DATA_DELETE_LOADING }))
            .toEqual({
                isLoading: true,
                errMess: null,
                deleteStatus: null,

            })

    });

    test('testing case POST_DATA_DELETE_SUCCESS', () => {
        expect(DeletePost(state, { type: POST_DATA_DELETE_SUCCESS, payload: 'success' }))
            .toEqual({
                isLoading: false,
                errMess: null,
                deleteStatus: 'success',
            })

    });

    test('testing case POST_DATA_DELETE_ERROR', () => {

        expect(DeletePost(state, { type: POST_DATA_DELETE_ERROR, payload: 'Network Error' }))
            .toEqual({
                isLoading: false,
                errMess: 'Network Error',
                deleteStatus: null,
            })

    });

    test('testing case REMOVE_DELETE_STATUS', () => {
        expect(DeletePost(state, { type: REMOVE_DELETE_STATUS }))
            .toEqual({
                isLoading: true,
                errMess: null,
                deleteStatus: null,
            })

    });



});

