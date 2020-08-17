import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './byAdmin.css';






// this is functional component with react-hooks
const ByAdmin = (props) => {
    const [item, setItem] = useState([]);

    // bringing name of the author from home to fetch data of that post from db
    // storing name in name variable
    const name = props.match.params.name;
    // useEffect is similar to componentDidMount() in class component , it fetces the data as soon as component is rendered
    useEffect(() => {
        axios.get("/by/" + name)
            .then(res => {
                setItem(res.data);
            })
    }, [name])



    return (
        <div>

            <div className="container article-by-container" style={{ marginTop: 20 }}>
                <h5 style={{ textAlign: "center" }}>Articles by: {name}</h5>
                <hr />
                {item.map(data => {
                    return (
                        <React.Fragment>
                            <div className=" article-by">
                                <div className="col-lg-4">
                                    <img src={"/image/" + data.imagename} className="im" alt="post img" />
                                </div>

                                <div className="byAdmin-article-details col-lg-7">
                                    <h3  ><Link to={"/post/" + data._id}  >{data.title}</Link></h3>
                                    <p className="byAdmin-article-desc"><ReactMarkdown source={data.desc} escapeHtml={false} /></p>
                                    <h6>Category:<Link to={"/category/" + data.category}> {data.category}</Link> Date:{data.date}</h6>

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


export default ByAdmin;
