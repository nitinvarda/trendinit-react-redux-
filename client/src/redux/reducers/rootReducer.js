import { combineReducers } from 'redux';


import login from './loginReducer';
import { UpdatePost, AddPost, DeletePost } from './postdata';
import { ArticleWithId, Articles, CategoryType, ByAuthor } from './articlesReducer'


// this is root reducers the dispatch when triggered
//  it will first reaches to rootreducer and perform action accordingly
export default combineReducers({

    login,
    UpdatePost,
    AddPost,
    DeletePost,
    Articles,
    ArticleWithId,
    CategoryType,
    ByAuthor
})