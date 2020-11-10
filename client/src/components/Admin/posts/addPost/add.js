import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import '../editPost/edit.css';
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import { postData } from '../../../../redux/actions/PostData';
import { Form, Col, Container, Button } from 'react-bootstrap'
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
        console.log(title, by, marked_desc, category, myImage)
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
                <Container>
                    <h3 className='text-center my-2 pb-3'>Add an Article</h3>
                    {errMess ? <Alert variant='danger'>{errMess}</Alert> : null}
                    <Form className='formstyle' onSubmit={Submit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name='title' onChange={onChange} placeholder="Enter Title" required />

                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="categoryType">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name='category' onChange={onChange} required >
                                    <option>Select a Category</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Technology">Technology</option>
                                    <option value="International">International</option>
                                    <option value="Others">Others</option>
                                </Form.Control>

                            </Form.Group>


                            <Form.Group as={Col} controlId="articleBy">
                                <Form.Label>By</Form.Label>
                                <Form.Control type='text' name='by' onChange={onChange} placeholder='Article By' required />

                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Col lg={6}>
                                <Form.File name="myImage" onChange={fileHandler} label='Upload an Image' required />

                            </Col>


                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Group as={Col} controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' name="desc" onChange={onChange} rows={5} required />

                            </Form.Group>

                        </Form.Row>
                        <Button variant='secondary' type='submit' block>Add Post</Button>

                    </Form>
                </Container>

            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}



export default Add;


