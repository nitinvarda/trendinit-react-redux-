import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './Post.css';



const Post = (props) => {
    const [item, setItem] = useState([]);


    const id = props.match.params.id

    useEffect(() => {
        axios.get("/article/" + id)
            .then(res => {

                setItem(res.data)

            })
    }, [id])
    const { title, category, date, by, desc, imagename } = item;

    return (
        <div className="container post">
            <div className="post-start">
                <div className=" post-details">
                    <img src={"/image/" + imagename} className="post-img" alt="post img" />

                    <div className="post-title" >
                        <br />
                        <h3 style={{ textAlign: "center" }} >{title}</h3>
                    </div>
                    <hr />



                </div>




                <div className="post-desc">


                    <h6>By:<Link to={"/by/" + by}>{by}</Link>--Category:<Link to={"/category/" + category} >{category}</Link>--Date:{date}</h6>
                    <br />
                    <h5><ReactMarkdown source={desc} escapeHtml={false} /></h5>



                </div>




            </div>

        </div>

    )


}

export default Post;




// class Post extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: this.props.match.params.id,
//             data: []
//         }
//     }
//     componentDidMount() {
//         axios.get("/article/" + this.state.id)
//             .then(res => {

//                 this.setState({
//                     data: res.data[0]
//                 })

//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//     render() {
//         const markdown = this.state.data.desc;
//         return (



//         );
//     }
// }

// export default Post;
