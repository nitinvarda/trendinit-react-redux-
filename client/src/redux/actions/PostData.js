import { POST_DATA_SUCCESS, POST_DATA_ERROR, POST_DATA_UPDATE_SUCCESS, POST_DATA_UPDATE_ERROR, REMOVE_STATUS, POST_DATA_DELETE_SUCCESS, POST_DATA_DELETE_ERROR } from './index';
import axios from 'axios';
import { setAlert } from '../actions/alert';


export const postData = ({ title, by, marked_desc, category, myImage }) => dispatch => {
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




    axios.post('/addpost', form, config)
        .then(res => {


            dispatch({ type: POST_DATA_SUCCESS, payload: res.data });
            setTimeout(() => dispatch({ type: REMOVE_STATUS }), 5000)

        })
        .catch(err => {

            const errors = err.response.data;

            if (errors) {
                dispatch(setAlert(errors.error, 'danger'));
            }
            dispatch({
                type: POST_DATA_ERROR,

            })
        })



}

export const updateData = ({ title, by, marked_desc, category, myImage, id, date }) => dispatch => {
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

    axios.post('/update/' + id, form, config)
        .then(res => {


            dispatch({ type: POST_DATA_UPDATE_SUCCESS, payload: res.data });
            setTimeout(() => dispatch({ type: REMOVE_STATUS }), 5000)

        })
        .catch(err => {

            const errors = err.response.data;

            if (errors) {
                dispatch(setAlert(errors.error, 'danger'));
            }
            dispatch({
                type: POST_DATA_UPDATE_ERROR,

            })
        })
}

export const delData = (id) => dispatch => {

    axios.post("/delete/" + id)
        .then(res => {
            console.log(res.data);
            dispatch({ type: POST_DATA_DELETE_SUCCESS, payload: res.data })
            setTimeout(() => dispatch({ type: REMOVE_STATUS }), 5000)

        })
        .catch(err => {

            const errors = err.response.data;

            if (errors) {
                dispatch(setAlert(errors.error, 'danger'));
            }
            dispatch({
                type: POST_DATA_DELETE_ERROR,

            })
        })

}