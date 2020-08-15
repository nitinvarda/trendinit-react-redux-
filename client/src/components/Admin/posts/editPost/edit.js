import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './edit.css';
import { connect } from 'react-redux';
import marked from 'marked';
import { updateData } from '../../../../redux/actions/PostData';




const Edit = (props) => {
    const [post, setPost] = useState({
        title: " ",
        by: "",
        desc: "",
        category: "",
        imagename: "",
        date: "",
        myImage: ""
    })
    const { title, by, desc, category, date, myImage } = post;

    const id = props.match.params.id;

    useEffect(() => {
        axios.get("/edit/" + id).then(res => {
            console.log(res.data);
            setPost(res.data)
        })

    }, [id])


    const marked_desc = marked(desc);
    const Submit = (e) => {
        e.preventDefault();
        props.updateData({
            title, by, marked_desc, category, myImage, id, date
        })

    }
    const onChange = (e) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    const fileHandler = (e) => {
        setPost({
            ...post, myImage: e.target.files[0]
        })
    }
    if (props.updateStatus === 'success') {
        return (<Redirect to="/admin-home" />)
    }
    else {
        return (
            <div className="divstyle">
                <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Add Post
                <hr /></h3>
                <form onSubmit={Submit} className="formstyle" >
                    <label><h4>Title</h4></label>
                    <input type="text" name="title" className="titletext" value={title} onChange={onChange} required />

                    <div className="catandby">
                        <div className="cat">
                            <div>
                                <label><h4>Category: </h4></label>
                            </div>
                            <div>
                                <select name="category" className="category" onChange={onChange} required>
                                    <option>Select Category</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Technology">Technology</option>
                                    <option value="International">International</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>

                        </div>
                        <br />
                        <div className="by" >
                            <label><h4>by</h4></label>
                            <input type="text" name="by" className="byinput" value={by} onChange={onChange} required />

                        </div>
                    </div>
                    <br />
                    <label>upload an Image</label>
                    <input type="file" name="myImage" className="up-img" onChange={fileHandler} required />


                    <br />
                    <br />
                    <div className="desc">
                        <label><h4>Description</h4></label>
                        <textarea name="desc" rows="4" cols="50" value={desc} onChange={onChange} required />

                    </div>


                    <input type="submit" className="postbtn" defaultValue="POST" />
                </form>



            </div>

        )

    }
}
const mapStateToProps = (state) => ({
    updateStatus: state.postdata.updateStatus
})

export default connect(mapStateToProps, { updateData })(Edit);

