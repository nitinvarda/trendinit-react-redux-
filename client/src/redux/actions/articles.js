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
import axios from 'axios';

export const fetchArticles = (pageNumber = '') => async (dispatch) => {


    dispatch({ type: ARTICLES_LOADING });


    try {
        const response = await axios.get(`/home?pageNumber=${pageNumber}`)

        dispatch({ type: ARTICLES_SUCCESS, payload: response.data })

    }
    catch (error) {

        dispatch({
            type: ARTICLES_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}

export const fetchArticleWithId = (id) => async (dispatch) => {
    dispatch({ type: ARTICLE_WITH_ID_LOADING })

    try {
        const response = await axios.get("/article/" + id)

        dispatch({ type: ARTICLE_WITH_ID_SUCCESS, payload: response.data })
    }
    catch (error) {
        dispatch({
            type: ARTICLE_WITH_ID_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
    }
}

export const categoryWise = (type) => async (dispatch) => {
    dispatch({ type: CATEGORY_TYPE_LOADING })


    try {
        const response = await axios.get("/cat/" + type)

        dispatch({ type: CATEGORY_TYPE_SUCCESS, payload: response.data, category: type })
    }
    catch (error) {
        dispatch({
            type: CATEGORY_TYPE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}

export const byAuthor = (name) => async (dispatch) => {
    dispatch({ type: BY_AUTHOR_LOADING })

    try {
        const response = await axios.get("/by/" + name)

        dispatch({ type: BY_AUTHOR_SUCCESS, payload: response.data, author: name })

    }
    catch (error) {

        dispatch({ type: BY_AUTHOR_ERROR, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })

    }
}