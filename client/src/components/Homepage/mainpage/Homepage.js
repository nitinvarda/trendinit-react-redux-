import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Homepage.css';

const Homepage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("/home").then(res => {
            setItems(res.data);
        })

    }, [])

    var posts = [];
    var oldposts = [];

    // items is json object which contain data of articles 
    var slice = items.slice(0, 3);
    // creating a for loop to add the latest three posts 
    for (let i = 0; i < slice.length; i++) {
        posts.push(

            <div className="first " style={{ backgroundImage: `url(${"/image/" + items[i].imagename})` }}>
                <div className="text">
                    <h4> <Link to={"/post/" + items[i]._id} style={{ color: 'white', textDecoration: 'none' }} >{items[i].title}</Link> </h4>

                </div>
                <div className="overlay"></div>
            </div>);
    }


    // creating a for loop to add the recent  posts other than top 3 
    for (var i = 3; i < items.length; i++) {

        oldposts.push(
            <div className="old-article-start">
                <img src={"/image/" + items[i].imagename} className="img" alt="article img" />
                <div className="article-details">
                    <h3  ><Link to={"/post/" + items[i]._id} >{items[i].title}</Link></h3>
                    <p className="article-desc"><ReactMarkdown source={items[i].desc} escapeHtml={false} /></p>
                    <h6>By:<Link to={"/by/" + items[i].by}>{items[i].by}</Link>--Date:{items[i].date}</h6>

                </div>

                <br />
            </div>

        )
    }



    return (
        <React.Fragment>
            <div className="main-content" >
                <div className="actual">
                    {posts}  {/* this is the above created top three posts */}
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
                            {oldposts} {/* this is all recent posts */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Homepage;
