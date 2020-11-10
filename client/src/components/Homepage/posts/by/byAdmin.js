import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import './byAdmin.css';

import { useSelector, useDispatch } from 'react-redux'
import { byAuthor } from '../../../../redux/actions/articles'
import Loader from '../../../Loader'
import { Breadcrumb, Alert } from 'react-bootstrap'






// this is functional component with react-hooks
const ByAdmin = (props) => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([]);

    // bringing name of the author from home to fetch data of that post from db
    // storing name in name variable
    const name = props.match.params.name;

    const ByAuthor = useSelector(state => state.ByAuthor)
    const { isLoading, errMess, ByAuthorData, author } = ByAuthor


    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        if (ByAuthorData) {
            if (author === name) {
                setItems(ByAuthorData)
            }
            else {

                dispatch(byAuthor(name))
            }

        }
        else {

            dispatch(byAuthor(name))
        }
    }, [name, author, dispatch, ByAuthorData])

    if (isLoading) {
        return <Loader />

    }
    else {

        return (
            <div>
                {errMess ? <Alert variant="danger" >{errMess}</Alert> : <div></div>}

                <div className="container article-by-container" style={{ marginTop: 20 }}>
                    <h5 style={{ textAlign: "center" }}>Articles by: {name}</h5>
                    <hr />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>{name}</Breadcrumb.Item>


                    </Breadcrumb>

                    {items.map(item => {
                        return (
                            <React.Fragment key={item._id} >
                                <div className=" article-by" >
                                    <div className="col-lg-4">
                                        <img src={"/image/" + item.imagename} className="im" alt="post img" />
                                    </div>

                                    <div className="byAdmin-article-details col-lg-7">
                                        <h3  ><Link to={"/post/" + item._id}  >{item.title}</Link></h3>
                                        <ReactMarkdown className="byAdmin-article-desc" source={item.desc} escapeHtml={false} />
                                        <h6>Category:<Link to={"/category/" + item.category}> {item.category}</Link> Date:{item.date}</h6>

                                    </div>

                                </div>
                                <hr />
                            </React.Fragment>
                        )
                    })}

                </div>
            </div>

        )
    }


}


export default ByAdmin;
