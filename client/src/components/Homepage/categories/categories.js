import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './categories.css';


// this is functional component with react-hooks
const Categories = (props) => {
    const [items, setItems] = useState([]);

    // here we are bringing category type as props to this component from admin-home component
    // which we use to fetch the relavent category data from db
    const type = props.match.params.type;
    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        axios.get("/cat/" + type)
            .then(res => {

                setItems(res.data)
            })
    }, [type])

    // if the category type doesn't have any data then it response with empty array
    // if there are no items 
    // then this is rendered
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
                <h5 style={{ textAlign: "center" }}>Category : {type}</h5>
                <hr />
                {items.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className="row ps">

                                <div className="col-md-4">
                                    <img src={"/image/" + item.imagename} className="im" alt="post img" />
                                </div>

                                <div className="cat-article-details col-md-8">
                                    <h3  ><Link to={"/post/" + item._id}  >{item.title}</Link></h3>
                                    <p className="cat-article-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></p>
                                    <h6>By:<Link to={"/by/" + item.by}>{item.by}</Link>--Date:{item.date}</h6>

                                </div>
                                <hr />



                            </div>
                            <hr />
                        </React.Fragment>

                    )
                })}

            </div>

        );
    }
}

export default Categories;
