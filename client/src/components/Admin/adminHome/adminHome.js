import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { delData } from '../../../redux/actions/PostData';

import { connect } from 'react-redux';





import {
    Link,
    Redirect
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import './adminhome.css';



const AdminHome = ({ isAuthenticated, delData, deleteStatus }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("/adminhome")
            .then(res => {

                setItems(res.data);
            })
            .catch(err => {
                console.log(err);
            })



    }, [])


    const delPost = (e) => {
        delData(e.target.id)
    }

    if (isAuthenticated) {
        if (deleteStatus === "deleted") {
            return window.location.reload();
        }
        else {
            return (
                <div className="container admin-home-start">
                    <div className="welcome-admin">
                        <h1 style={{ textAlign: 'left' }}>Welcome Admin</h1>
                        <div className="d-flex justify-content-between">

                            <Link to="/add" className="btn btn-primary btn-sm">New Post</Link>
                            <button className="btn btn-danger btn-sm">Logout</button>

                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {items.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="col-xl-3">
                                    <img src={"/image/" + item.imagename} className="adminhome-article-img" alt="post img" />
                                </div>
                                <div className="adminhome-article col-xl-9">
                                    <h3><Link to={"/admin-post/" + item._id} >{item.title}</Link></h3>
                                    <h5>Article by:<b><i>{item.by}</i></b> --&nbsp; Category:<b><i> {item.category}</i></b> --&nbsp; Date: {item.date} - IST  </h5>
                                    <br />
                                    <h4 className="admin-home-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></h4>
                                    <br />
                                    <button type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + item._id }} style={{ color: "white" }}>Edit</Link></button>
                                    <button onClick={delPost} id={item._id} type="button" className="btn btn-danger del">Delete</button>
                                    <hr />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                </div>

            )
        }
    }

    else {
        return <Redirect to="/admin" />
    }

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    deleteStatus: state.postdata.deleteStatus
})


export default connect(mapStateToProps, { delData })(AdminHome);


