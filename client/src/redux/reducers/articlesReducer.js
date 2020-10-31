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

const initialState = {
    isLoading: true,
    page: 0,
    pages: 0,
    articles: [],
    errMess: null
}

export const Articles = function (state = initialState, action) {
    switch (action.type) {
        case ARTICLES_LOADING:
            return {
                ...state,
                isLoading: true

            }
        case ARTICLES_SUCCESS:

            return {
                ...state,
                isLoading: false,
                articles: action.payload.articles,
                page: action.payload.page,
                pages: action.payload.pages,

            }
        case ARTICLES_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,


            }
        default:
            return state
    }


}

const articleWithIdState = {
    isLoading: true,
    errMess: null,
    article: null
}

export const ArticleWithId = (state = articleWithIdState, action) => {
    switch (action.type) {
        case ARTICLE_WITH_ID_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ARTICLE_WITH_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                article: action.payload
            }
        case ARTICLE_WITH_ID_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }
        default:
            return state
    }
}


const categoryTypeState = {
    isLoading: true,
    errMess: null,
    category: null,
    categoryTypeData: [],


}

export const CategoryType = (state = categoryTypeState, action) => {
    switch (action.type) {
        case CATEGORY_TYPE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORY_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                category: action.category,
                categoryTypeData: action.payload
            }
        case CATEGORY_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }
        default:
            return state


    }

}

const byAuthorState = {
    isLoading: true,
    errMess: null,
    author: null,
    ByAuthorData: []
}


export const ByAuthor = (state = byAuthorState, action) => {
    switch (action.type) {
        case BY_AUTHOR_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case BY_AUTHOR_SUCCESS:
            return {
                ...state,
                ByAuthorData: action.payload,
                author: action.author,
                isLoading: false
            }
        case BY_AUTHOR_ERROR:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }
        default:
            return state
    }

}