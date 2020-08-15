import React, { useState } from 'react';
import { connect } from 'react-redux';

import { login } from '../../../redux/actions/Login';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './admin.css';


const Admin = ({ Login, isAuthenticated }) => {
    const [details, setDetails] = useState({
        username: '',
        password: ''
    })

    const onChange = (e) => {
        setDetails({
            ...details, [e.target.name]: e.target.value
        })
    }
    const submitForm = (e) => {
        e.preventDefault();
        Login(username, password);

    }
    const { username, password } = details;
    // redirect if logged in
    if (isAuthenticated) {

        return <Redirect to="/admin-home" />
    }
    else {
        return (
            <div className="container">


                <div className=" loginpage ">
                    <h3 style={{ textAlign: "center", marginTop: "10px" }}>Admin Login<hr /></h3>
                    <form onSubmit={submitForm} className="loginform">
                        <input type="text" name="username" value={username} className="username" onChange={onChange} placeholder="username" required />
                        <input type="password" name="password" value={password} className="password" onChange={onChange} placeholder="password" required />


                        <input type="Submit" style={{ backgroundColor: "#FF0000" }} defaultValue="Login" />


                    </form>

                </div>


            </div>





        );
    }
}

Admin.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({

    isAuthenticated: state.login.isAuthenticated

})
const mapDispatchToProps = (dispatch) => {
    return {
        Login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
