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

const initialState = {
    isLoading: true,
    errMess: null,
    postStatus: null,

}

// this reducer will recieve response after adding or editing or deleting post
export const AddPost = function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case POST_DATA_LOADING:
            return {
                isLoading: true
            }
        case POST_DATA_SUCCESS:
            return {
                ...state,
                postStatus: payload,
                isLoading: false
            }
        case POST_DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: payload
            }
        case REMOVE_ADD_STATUS:
            return {
                ...state,
                postStatus: null
            }

        default:
            return state
    }
}

const updateState = {
    isLoading: true,
    errMess: null,
    updateStatus: null

}

export const UpdatePost = function (state = updateState, action) {
    const { type, payload } = action
    switch (type) {
        case POST_DATA_UPDATE_LOADING:
            return {
                isLoading: true
            }
        case POST_DATA_UPDATE_SUCCESS:
            return {
                ...state,
                updateStatus: payload,
                isLoading: false
            }
        case POST_DATA_UPDATE_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: payload
            }
        case REMOVE_UPDATE_STATUS:
            return {
                ...state,
                updateStatus: null
            }
        default:
            return state

    }
}




const deleteState = {
    isLoading: true,
    errMess: null,
    deleteStatus: null

}

export const DeletePost = function (state = deleteState, action) {
    const { type, payload } = action
    switch (type) {
        case POST_DATA_DELETE_LOADING:
            return {
                isLoading: true
            }
        case POST_DATA_DELETE_SUCCESS:
            return {
                ...state,
                deleteStatus: payload,
                isLoading: false
            }
        case POST_DATA_DELETE_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: payload
            }
        case REMOVE_DELETE_STATUS:
            return {
                ...state,
                deleteStatus: null
            }
        default:
            return state

    }
}