import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../../redux/actions/Login';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card, Alert } from 'react-bootstrap'
import Loader from '../../Loader'

// import { TextField, Button, FormGroup } from '@material-ui/core'
import './admin.css';


const Admin = () => {
    const dispatch = useDispatch()
    const [details, setDetails] = useState({
        username: '',
        password: ''
    })

    const Login = useSelector(state => state.login)
    const { isAuthenticated, isLoading, errMess } = Login

    // handling form elements
    const onChange = (e) => {
        setDetails({
            ...details, [e.target.name]: e.target.value
        })
    }
    // submit function
    const submitForm = (e) => {
        e.preventDefault();
        // console.log(details)
        dispatch(login(username, password));

    }
    const { username, password } = details;
    if (isLoading) {
        return <Loader />
    }
    else {



        if (isAuthenticated) {
            // if user is authenticated redirect to admin-home
            return <Redirect to="/admin-home" />
        }
        else {
            return (
                <Container >



                    <Row >
                        <Col md={6} className="my-auto" >

                            <h1 className='my-5 login-heading text-center' >Admin ?</h1>

                        </Col>
                        <Col md={6} className='my-5'>

                            {errMess ? <Alert data-testid="err" variant="danger">{errMess}</Alert> : <div></div>}
                            <Card>
                                <Card.Header className="text-center" style={{ fontFamil: 'Sen', fontSize: 25, fontWeight: 700 }}>LOGIN HERE</Card.Header>
                                <Card.Body>
                                    <Form autoComplete="off" onSubmit={submitForm} >
                                        <Form.Group controlId="forUserName" >
                                            <Form.Label >Username</Form.Label>
                                            <Form.Control type="text" data-testid="username" name="username" placeholder="Enter username" required onChange={onChange} />

                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label >password</Form.Label>
                                            <Form.Control type="password" data-testid="password" name="password" placeholder="Enter Password" required onChange={onChange} />

                                        </Form.Group>

                                        <div style={{ width: "50%", margin: 'auto' }}>

                                            <Button data-testid='button' style={{ width: "90%" }} variant="danger" type="submit" size="lg" >Login</Button>
                                        </div>


                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>





            );
        }
    }
}

// default proptypes for this component
Admin.propTypes = {
    isAuthenticated: PropTypes.bool
}


export default Admin;
