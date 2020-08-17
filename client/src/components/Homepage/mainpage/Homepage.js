import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Homepage.css';

// this is functional component with react hooks
const Homepage = () => {
    const [items, setItems] = useState([]);

    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        axios.get("/home").then(res => {
            setItems(res.data);
        })

    }, [])

    // this is for the top three latest posts
    const posts = items.slice(0, 3);
    // this is for all other posts
    const oldposts = items.slice(3);

    return (
        <React.Fragment>
            <div className="main-content" >
                <div className="actual">
                    {posts.map((item, i) => {
                        return (
                            <div className="first " style={{ backgroundImage: `url(${"/image/" + item.imagename})` }} key={i}>
                                <div className="text">
                                    <h4> <Link to={"/post/" + item._id} style={{ color: 'white', textDecoration: 'none' }} >{item.title}</Link> </h4>

                                </div>
                                <div className="overlay"></div>
                            </div>)

                    })}

                </div>
                <hr />
                <h3 style={{ textAlign: 'center' }}>Recent Stories</h3>
                <div className="container ">
                    <div className="row">
                        <div className="col-sm-3"  >
                            <div className=" side-content">
                                <div>
                                    <h4 style={{ textAlign: 'center', paddingTop: 10 }}>Categories</h4>
                                    <hr />
                                    <ul className="cat-list">
                                        <li><Link to="/category/Sports" style={{ textDecoration: 'none', color: 'white' }}>Sports</Link></li>
                                        <li><Link to="/category/Politics" style={{ textDecoration: 'none', color: 'white' }}>Politics</Link></li>
                                        <li><Link to="/category/Technology" style={{ textDecoration: 'none', color: 'white' }}>Technology</Link></li>
                                        <li><Link to="/category/Entertainment" style={{ textDecoration: 'none', color: 'white' }}>Entertainment</Link></li>
                                        <li><Link to="/category/International" style={{ textDecoration: 'none', color: 'white' }}>International</Link></li>
                                        <li><Link to="/category/Others" style={{ textDecoration: 'none', color: 'white' }}>Others</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            {oldposts.map((item, i) => {
                                return (
                                    <div className="old-article-start" key={i}>
                                        <img src={"/image/" + item.imagename} className="img" alt="article img" />
                                        <div className="article-details">
                                            <h3  ><Link to={"/post/" + item._id} >{item.title}</Link></h3>
                                            <p className="article-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></p>
                                            <h6>By:<Link to={"/by/" + item.by}>{item.by}</Link>--Date:{item.date}</h6>

                                        </div>

                                        <br />
                                    </div>

                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Homepage;
