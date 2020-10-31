import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../../Homepage/posts/post/Post.css';
import { delData } from '../../../../redux/actions/PostData';
import { fetchArticleWithId } from '../../../../redux/actions/articles';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap'
import Loader from '../../../Loader'

const AdminPost = (props) => {
    const dispatch = useDispatch()
    const [post, setPost] = useState([]);

    // we are getting into post details and this comonent recieves id as props from admin-home
    // which we use for fetching the relavent post from db
    // the recieved id as props is saved to id variable
    const id = props.match.params.id

    const User = useSelector(state => state.login)
    const { isAuthenticated } = User

    const Article = useSelector(state => state.ArticleWithId)
    const { isLoading: articleLoading, errMess: articleError, article } = Article

    const DeletePost = useSelector(state => state.DeletePost)
    const { errMess: deleteError, deleteStatus } = DeletePost

    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        if (article) {
            if (article._id === id) {
                setPost(article)

            }
            else {
                dispatch(fetchArticleWithId(id))

            }

        }
        else {
            dispatch(fetchArticleWithId(id))

        }
    }, [id, article, dispatch])
    const { title, date, by, desc, imagename, _id } = post;

    // for deleting the post 
    const delPost = (e) => {
        dispatch(delData(e.target.id))
    }
    // if deleted successfully
    if (isAuthenticated) {


        if (deleteStatus === "deleted") {
            // it redirects to admin-home
            return (<Redirect to="/admin-home" />)
        }
        else {
            return (
                <div className="container post">
                    {articleLoading ? <Loader /> : <div></div>}

                    {articleError ? <Alert>{articleError}</Alert> : <div></div>}
                    {deleteError ? <Alert>{deleteError}</Alert> : <div></div>}
                    <div className="post-start">
                        <div className=" post-details">
                            <img src={"/image/" + imagename} className="post-img" alt="post img" />
                            <br />
                            <div className="post-title" >
                                <h3 >{title}</h3>
                                <buttton type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + _id }} style={{ color: "white" }}>Edit</Link></buttton>
                                <button onClick={delPost} id={_id} type="button" className="btn btn-danger del">Delete</button>
                            </div>
                            <hr />



                        </div>
                        <div className="post-desc">


                            <h6>By:<Link to={"/by/" + by}>{by}</Link>--Date:{date}</h6>
                            <br />
                            <h5><ReactMarkdown source={desc} escapeHtml={false} /></h5>



                        </div>




                    </div>

                </div>

            )
        }
    }
    else {
        return <Redirect to="/admin" />
    }
}

// bringing state to props in this component


export default AdminPost;
