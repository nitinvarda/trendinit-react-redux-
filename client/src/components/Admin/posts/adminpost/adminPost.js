import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../../Homepage/posts/post/Post.css';
import { delData } from '../../../../redux/actions/PostData';

import { connect } from 'react-redux';

const AdminPost = (props) => {
    const [item, setItem] = useState([]);

    // we are getting into post details and this comonent recieves id as props from admin-home
    // which we use for fetching the relavent post from db
    // the recieved id as props is saved to id variable
    const id = props.match.params.id
    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        axios.get("/article/" + id)
            .then(res => {

                setItem(res.data)

            })
    }, [id])
    const { title, date, by, desc, imagename } = item;

    // for deleting the post 
    const delPost = (e) => {
        props.delData(e.target.id)
    }
    // if deleted successfully
    if (props.deleteStatus === "deleted") {
        // it redirects to admin-home
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

// bringing state to props in this component
const mapStateToProps = (state) => ({
    deleteStatus: state.postdata.deleteStatus
})

export default connect(mapStateToProps, { delData })(AdminPost);
