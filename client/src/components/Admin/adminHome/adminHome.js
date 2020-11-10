import React, { useEffect } from 'react';

import { delData } from '../../../redux/actions/PostData';
import { logout } from '../../../redux/actions/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../../redux/actions/articles'
import Loader from '../../Loader'
import { Alert, Row, Col, Image, Button } from 'react-bootstrap'

import {
    Link,
    Redirect
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import './adminhome.css';


// this is functional component with react hooks
const AdminHome = (props) => {
    const pageNumber = props.match.params.pageNumber || 1

    const dispatch = useDispatch()
    // delete post button function
    const delPost = (e) => {
        dispatch(delData(e.target.id))
    }
    const Logout = () => {
        dispatch(logout())
    }

    const deletePost = useSelector(state => state.DeletePost)
    const { errMess: deletePostError, deleteStatus } = deletePost

    const login = useSelector(state => state.login)
    const { isAuthenticated, logout: logoutUser } = login

    // using useEffect to bring posts from db as soon this component renders
    useEffect(() => {

        dispatch(fetchArticles(pageNumber))


    }, [deleteStatus, logoutUser, dispatch, pageNumber])





    const Articles = useSelector(state => state.Articles)
    const { isLoading: articlesLoading, errMess: articlesError, articles } = Articles


    // checking user authentication
    if (isAuthenticated) {
        // if any post is deleted it get result as deleted 
        // then page is reloaded to see the changes

        return (
            <div className="container admin-home-start">
                {articlesLoading ? <Loader /> : <div></div>}

                {articlesError ? <Alert variant='danger'>{articlesError}</Alert> : <div></div>}
                {deletePostError ? <Alert variant='danger'>{deletePostError}</Alert> : <div></div>}

                <div className="welcome-admin">
                    <h1 style={{ textAlign: 'left' }}>Welcome Admin</h1>
                    <div className="d-flex justify-content-between">

                        <Link to="/add" className="btn btn-primary btn-sm">New Post</Link>
                        <button className="btn btn-danger btn-sm" onClick={Logout}>Logout</button>

                    </div>
                </div>
                <hr />

                <Row className="row">
                    {articles.map((item, i) => (
                        <React.Fragment key={i}>
                            <Col lg={5} className="">
                                <Link to={"/admin-post/" + item._id} >
                                    <Image src={"/image/" + item.imagename} alt="post img" fluid />
                                </Link>
                            </Col>
                            <Col lg={7}  >
                                <h3><Link to={"/admin-post/" + item._id} >{item.title}</Link></h3>
                                <br />
                                <h5>Article by:<b><i>{item.by}</i></b> --&nbsp; Category:<b><i> {item.category}</i></b> --&nbsp; Date: {item.date.substring(0, 10)}  </h5>
                                <br />

                                <h4 className="admin-home-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></h4>
                                <br />

                                <Button variant="secondary" type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + item._id }} style={{ color: "white" }}>Edit</Link></Button>
                                <Button variant="danger" onClick={delPost} id={item._id} type="button" className="btn btn-danger del">Delete</Button>
                                <hr />
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>

            </div>

        )

    }

    else {
        // if user is not authenticated it redirects to admin login page
        return <Redirect to="/admin" />
    }

}





export default AdminHome;


