import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// import './Post.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { fetchArticleWithId } from '../../../../redux/actions/articles'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../../Loader';

// this is functional component with react-hooks
const Post = (props) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState([]);

    // bringing post id from home to fetch data of that post from db
    // storing id in id variable
    const id = props.match.params.id

    const Article = useSelector(state => state.ArticleWithId)
    const { isLoading: articleLoading, errMess: articleError, article } = Article
    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        if (article) {
            if (article._id === id) {
                setItem(article)

            }
            else {
                dispatch(fetchArticleWithId(id))

            }

        }
        else {
            dispatch(fetchArticleWithId(id))

        }
    }, [id, article, dispatch])
    const { title, category, date, by, desc, imagename } = item;
    if (title) {
        var split = title.split(" ")
        var breadName = split[1] + " " + split[2]


    }

    if (articleLoading) {
        return <Loader />

    }
    else {


        return (
            <div>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href={'/category/' + category}>{category}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{breadName}</Breadcrumb.Item>

                    </Breadcrumb>
                </Container>
                {articleError ? <Alert variant='danger'>{articleError}</Alert> : <div></div>}
                <div className=" post-details">
                    <img src={"/image/" + imagename} className="post-img" alt="post img" />

                    <div className="post-title" >
                        <br />
                        <h4 style={{ textAlign: "center" }} >{title}</h4>
                    </div>
                    <hr />



                </div>
                <Container>

                    <Row >


                        <Col xs={6} md={4} >
                            <h5>By: <Link to={"/by/" + by}>{by}</Link> </h5>

                        </Col>
                        <Col xs={6} md={4} >
                            <h5>Category: <Link to={"/category/" + category} >{category}</Link></h5>

                        </Col>
                        <Col xs={12} md={4} >
                            <h5>Date: {date}</h5>

                        </Col>


                        <br />
                        <Col >
                            <ReactMarkdown className='post_desc' source={desc} escapeHtml={false} />
                        </Col>



                    </Row>
                </Container>






            </div>

        )
    }


}

export default Post;




