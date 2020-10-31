import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Pagination, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Article from '../../Article'
import { fetchArticles } from '../../../redux/actions/articles'
import Loader from '../../Loader'


const OtherPages = (props) => {
    const dispatch = useDispatch()
    const pageNumber = props.match.params.pageNumber


    const Articles = useSelector(state => state.Articles)
    const { isLoading, pages, articles, errMess } = Articles
    useState(() => {
        dispatch(fetchArticles(pageNumber))
    }, [pageNumber])


    let pagination = []
    for (let number = 1; number <= pages; number++) {

        pagination.push(
            <Pagination.Item key={number} active={number === Number(pageNumber)}>
                {number === 1 ? (<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>{number}</Link>) : (<Link to={'/page/' + number} style={{ textDecoration: 'none', color: 'black' }}>{number}</Link>)}

            </Pagination.Item>
        );
    }
    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <Container>
                <Row>
                    {errMess ? <Alert variant="danger">{errMess}</Alert> : <div></div>}
                    {articles.map((item, i) => {
                        return (
                            <Col key={i} sm={12} md={6} lg={4} xl={4}>
                                <Link to={"/post/" + item._id} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Article item={item} />
                                </Link>

                                <br />
                            </Col>


                        )
                    })}
                </Row>
                <Pagination>{pagination}</Pagination>
            </Container>
        );
    }
}


export default OtherPages;
