import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './categories.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { categoryWise } from '../../../redux/actions/articles'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Alert } from 'react-bootstrap'
import Loader from '../../Loader'

// this is functional component with react-hooks
const Categories = (props) => {

    const dispatch = useDispatch()
    const [items, setItems] = useState([]);

    // here we are bringing category type as props to this component from admin-home component
    // which we use to fetch the relavent category data from db
    const type = props.match.params.type;

    const categoryType = useSelector(state => state.CategoryType)
    const { isLoading, errMess, categoryTypeData, category } = categoryType

    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        if (categoryTypeData) {
            if (category === type) {
                setItems(categoryTypeData)
            }
            else {
                dispatch(categoryWise(type))
            }

        }
        else {

            dispatch(categoryWise(type))
        }
    }, [type, category, categoryTypeData, dispatch])

    // if the category type doesn't have any data then it response with empty array
    // if there are no items 
    // then this is rendered
    if (isLoading) {
        return <Loader />
    }
    else {


        if (items.length === 0) {
            return (
                <div className="container" style={{ textAlign: "center", marginTop: 50 }}>
                    <h5>No posts yet on this Category</h5>
                </div>
            )
        }
        else {
            return (

                <div className="container" style={{ marginTop: 30 }}>
                    {errMess ? <Alert variant='danger'>{errMess}</Alert> : <div></div>}
                    <h5 style={{ textAlign: "center" }}>Category : {type}</h5>
                    <hr />
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{type}</Breadcrumb.Item>

                    </Breadcrumb>
                    {isLoading ? <Loader /> : <div></div>}
                    {items.map((item, i) => {
                        return (

                            <React.Fragment key={i}>
                                <Row className="">
                                    <Col lg={5} className="">
                                        <Link to={"/post/" + item._id} >
                                            <Image src={"/image/" + item.imagename} alt="post img" fluid />
                                        </Link>
                                    </Col>
                                    <Col lg={7}  >
                                        <h3><Link to={"/post/" + item._id} >{item.title}</Link></h3>
                                        <br />
                                        <h5>Article by:<b><i>{item.by}</i></b> --&nbsp; Category:<b><i> {item.category}</i></b> --&nbsp; Date: {item.date.substring(0, 10)}  </h5>
                                        <br />

                                        <h4 className="admin-home-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></h4>
                                        <br />


                                    </Col>

                                    <hr />
                                </Row>
                                <hr />
                            </React.Fragment>

                        )
                    })}

                </div>

            );
        }
    }
}

export default Categories;
