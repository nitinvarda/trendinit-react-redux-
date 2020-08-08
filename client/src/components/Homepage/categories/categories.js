import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = (props) => {
    const [items, setItems] = useState([]);

    const type = props.match.params.type
    useEffect(() => {
        axios.get("/cat/" + type)
            .then(res => {
                console.log(res.data);
                setItems(res.data)
            })
    }, [type])


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
                {items.map(item => {
                    return (
                        <React.Fragment>
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
