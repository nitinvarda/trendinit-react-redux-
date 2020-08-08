import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../../Homepage/posts/post/Post.css';
import { delData } from '../../../../redux/actions/PostData';

import { connect } from 'react-redux';

const AdminPost = (props) => {
    const [item, setItem] = useState([]);

    const id = props.match.params.id
    useEffect(() => {
        axios.get("/article/" + id)
            .then(res => {

                setItem(res.data)

            })
    }, [id])
    const { title, date, by, desc, imagename } = item;


    const delPost = (e) => {
        props.delData(e.target.id)
    }
    if (props.deleteStatus === "deleted") {
        return (<Redirect to="/admin-home" />)
    }
    else {
        return (
            <div className="container post">
                <div className="post-start">
                    <div className=" post-details">
                        <img src={"/image/" + imagename} className="post-img" alt="post img" />
                        <br />
                        <div className="post-title" >
                            <h3 >{title}</h3>
                            <buttton type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit/" + item._id }} style={{ color: "white" }}>Edit</Link></buttton>
                            <button onClick={delPost} id={item._id} type="button" className="btn btn-danger del">Delete</button>
                        </div>
                        <hr />



                    </div>
                    <div className="post-desc">


                        <h6>By:<Link to={"/by/" + by}>{by}</Link>--Date:{date}</h6>
                        <br />
                        <h5><ReactMarkdown source={desc} escapeHtml={false} /></h5>



                    </div>




                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    deleteStatus: state.postdata.deleteStatus
})

export default connect(mapStateToProps, { delData })(AdminPost);
