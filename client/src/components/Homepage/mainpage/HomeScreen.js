import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Pagination, Badge, Alert } from 'react-bootstrap'

import './Homepage.css'
import Loader from '../../Loader'
import { useDispatch, useSelector } from 'react-redux'
import Article from '../../Article'


import { fetchArticles } from '../../../redux/actions/articles';




// this is functional component with react hooks
const HomeScreen = (props) => {
    const pageNumber = props.match.params.pageNumber || 1

    const dispatch = useDispatch()

    const Articles = useSelector(state => state.Articles)
    const { isLoading, pages, articles, errMess } = Articles
    // useEffect is similar to componentDidMount() in class component ,
    //  it fetces the data as soon as component is rendered
    useEffect(() => {
        dispatch(fetchArticles(pageNumber))

    }, [dispatch, pageNumber])


    // this is for the top three latest posts



    const posts = articles.slice(0, 3);
    // this is for all other posts
    const oldposts = articles.slice(3);

    // const cat = (e) => {
    //     <Link to={"/category/" + e.target.name} />
    // }

    let pagination = []
    for (let number = 1; number <= pages; number++) {
        pagination.push(
            <Pagination.Item key={number} active={number === pageNumber}>
                {number === 1 ? (<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>{number}</Link>) : (<Link to={'/page/' + number} style={{ textDecoration: 'none', color: 'black' }}>{number}</Link>)}
            </Pagination.Item>,
        );
    }

    return (
        <React.Fragment>
            <div className="main-content" >
                {isLoading ? <Loader /> : <div></div>}
                {errMess ? <Alert variant='danger'>{errMess}</Alert> : <div></div>}
                {/*  */}
                <Row noGutters >
                    {posts.map((item, i) => {
                        return (
                            <Col sm={4}>
                                <Link to={"/post/" + item._id} style={{ color: 'white', textDecoration: 'none' }} >
                                    <div className="first" style={{ backgroundImage: `url(${"/image/" + item.imagename})` }} key={i}>
                                        <div className="text ">
                                            <h4> {item.title} </h4>

                                        </div>
                                        <div className="overlay"></div>
                                    </div>
                                </Link>
                            </Col>
                        )

                    })}

                </Row>

                <hr />

                <div className="container ">
                    <div className="category-mobile">
                        <h4 className="text-center">Categories</h4>
                        <Row>

                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th><Badge variant="primary">New</Badge><a href="https://covid19indian-state.netlify.app/" target="_blank">Covid<br />
                                        </a></th>
                                        <th ><Link to="/category/Sports">Sports</Link></th>
                                        <th ><Link to="/category/Politics">Politics</Link></th>
                                        <th ><Link to="/category/Technology">Technology</Link></th>
                                        <th ><Link to="/category/Entertainment">Entertainment</Link></th>
                                        <th ><Link to="/category/International">International</Link></th>
                                        <th ><Link to="/category/Others">Others</Link></th>



                                    </tr>
                                </thead>

                            </Table>
                        </Row>
                    </div>
                    <h4 className="text-center">Recent Stories</h4>
                    <Row>

                        {oldposts.map((item, i) => {
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
                    <div className="container">

                        <Pagination>{pagination}</Pagination>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}




export default HomeScreen;
