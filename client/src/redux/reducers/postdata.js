import { POST_DATA_SUCCESS, POST_DATA_ERROR, POST_DATA_UPDATE_SUCCESS, POST_DATA_UPDATE_ERROR, REMOVE_STATUS, POST_DATA_DELETE_SUCCESS, POST_DATA_DELETE_ERROR } from '../actions/index';

const initialState = {
    postStatus: null,
    updateStatus: null,
    deleteStatus: null
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case POST_DATA_SUCCESS:
            return {
                ...state,
                postStatus: payload
            }
        case POST_DATA_UPDATE_SUCCESS:
            return {
                ...state,
                updateStatus: payload
            }
        case POST_DATA_DELETE_SUCCESS:
            return {
                ...state,
                deleteStatus: payload

            }
        case POST_DATA_ERROR:
            return {
                ...state,
                postStatus: 'error'
            }
        case POST_DATA_UPDATE_ERROR:
            return {
                ...state,
                updateStatus: 'error'
            }
        case POST_DATA_DELETE_ERROR:
            return {
                ...state,
                deleteStatus: 'error'
            }
        case REMOVE_STATUS:
            return {
                postStatus: null,
                updateStatus: null,
                deleteStatus: null
            }

        default:
            return state
    }
}