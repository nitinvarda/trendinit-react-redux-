import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import '../editPost/edit.css';
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import { postData } from '../../../../redux/actions/PostData';

import { Alert } from 'react-bootstrap'



// this is functional component with react hooks

const Add = () => {
    const dispatch = useDispatch()
    const [post, setPost] = useState({
        title: " ",
        by: "",
        desc: "",
        category: "",
        imagename: "",
        myImage: ""
    })


    const { title, by, desc, category, myImage } = post;
    const marked_desc = marked(desc);


    const User = useSelector(state => state.login)
    const { isAuthenticated } = User

    const Addpost = useSelector(state => state.AddPost)
    const { errMess, postStatus } = Addpost

    // this is submit funciton for adding post
    const Submit = (e) => {
        e.preventDefault();
        dispatch(postData({
            title, by, marked_desc, category, myImage
        }))

    }
    // this handles the form elements when changed 
    const onChange = (e) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    // this handles the image files in the form
    const fileHandler = (e) => {
        setPost({
            ...post, myImage: e.target.files[0]
        })
    }

    if (isAuthenticated) {
        // if post is submitted successfully it gets a response as 'success'

        if (postStatus === 'success') {
            // after successful submission it redirects to admin-home
            return (<Redirect to="/admin-home" />)
        }
        else {
            return (
                <div className="divstyle">
                    <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Add Post
                    <hr /></h3>
                    {errMess ? <Alert variant='danger' >{errMess}</Alert> : <div></div>}
                    <form onSubmit={Submit} className="formstyle" >
                        <label><h4>Title</h4></label>
                        <input type="text" name="title" className="titletext" value={title} onChange={onChange} required />

                        <div className="catandby">
                            <div className="cat">
                                <div>
                                    <label><h4>Category: </h4></label>
                                </div>
                                <div>
                                    <select name="category" className="category" onChange={onChange} required>
                                        <option>Select Category</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Politics">Politics</option>
                                        <option value="Technology">Technology</option>
                                        <option value="International">International</option>
                                        <option value="Others">Others</option>
                                    </select>

                                </div>

                            </div>
                            <br />
                            <div className="by" >
                                <label><h4>by</h4></label>
                                <input type="text" name="by" className="byinput" value={by} onChange={onChange} required />

                            </div>
                        </div>
                        <br />
                        <label>upload an Image</label>
                        <input type="file" name="myImage" className="up-img" onChange={fileHandler} required />


                        <br />
                        <br />
                        <div className="desc">
                            <label><h4>Description</h4></label>
                            <textarea name="desc" rows="4" cols="50" value={desc} onChange={onChange} required />

                        </div>


                        <input type="submit" className="postbtn" defaultValue="POST" />
                    </form>



                </div>

            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}



export default Add;


