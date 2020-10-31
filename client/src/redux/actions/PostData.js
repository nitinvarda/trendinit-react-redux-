import {
    POST_DATA_LOADING,
    POST_DATA_SUCCESS,
    POST_DATA_ERROR,
    POST_DATA_UPDATE_LOADING,
    POST_DATA_UPDATE_SUCCESS,
    POST_DATA_UPDATE_ERROR,
    POST_DATA_DELETE_LOADING,
    POST_DATA_DELETE_SUCCESS,
    POST_DATA_DELETE_ERROR,
    REMOVE_ADD_STATUS,
    REMOVE_UPDATE_STATUS,
    REMOVE_DELETE_STATUS,
} from '../constants/postConstants';
import axios from 'axios';


// adding , editing and deleting of post done here
export const postData = ({ title, by, marked_desc, category, myImage }) => async (dispatch) => {

    dispatch({ type: POST_DATA_LOADING })
    // for handling images we need to use multipart/form-data to send it to backend
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };


    const form = new FormData();
    form.append("myImage", myImage);
    form.append("title", title);
    form.append("category", category);
    form.append("desc", marked_desc);
    form.append("by", by);




    try {
        const response = await axios.post('/addpost', form, config)

        dispatch({ type: POST_DATA_SUCCESS, payload: response.data });
        // as soon as post is added we get response as success, if the response remains constant we cannot change or add other post
        // so removing the status after 5 seconds so we can do other alteration 
        setTimeout(() => dispatch({ type: REMOVE_ADD_STATUS }), 3000)

    }



    catch (error) {

        dispatch({
            type: POST_DATA_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }






}

export const updateData = ({ title, by, marked_desc, category, myImage, id, date }) => async (dispatch) => {

    dispatch({ type: POST_DATA_UPDATE_LOADING })
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };


    const form = new FormData();
    form.append("myImage", myImage);
    form.append("title", title);
    form.append("category", category);
    form.append("desc", marked_desc);
    form.append("date", date)
    form.append("by", by);


    try {

        const response = await axios.post('/update/' + id, form, config)

        dispatch({ type: POST_DATA_UPDATE_SUCCESS, payload: response.data });
        // as soon as post is added we get response as success, if the response remains constant we cannot change or add other post
        // so removing the status after 5 seconds so we can do other alteration 
        setTimeout(() => dispatch({ type: REMOVE_UPDATE_STATUS }), 3000)

    }
    catch (error) {
        dispatch({
            type: POST_DATA_UPDATE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }



}

export const delData = (id) => async (dispatch) => {
    dispatch({ type: POST_DATA_DELETE_LOADING })

    try {
        const response = await axios.delete("/delete/" + id)

        dispatch({ type: POST_DATA_DELETE_SUCCESS, payload: response.data })
        // as soon as post is added we get response as success, if the response remains constant we cannot change or add other post
        // so removing the status after 5 seconds so we can do other alteration 
        setTimeout(() => dispatch({ type: REMOVE_DELETE_STATUS }), 3000)

    }
    catch (error) {
        dispatch({
            type: POST_DATA_DELETE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }


}