import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'


// this is a simple contact us component which is stateless functional component
const NavBar = () => {
    return (

        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top" >


            <Link className="navbar-brand" to="/" style={{ color: "white", paddingLeft: 10 }}><h4 className="title" id="trend">TREND</h4><h4 className="title" id="init">INIT</h4></Link>



            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin-home" style={{ color: "white" }}>Admin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact" style={{ color: "white" }}>Contact Us</Link>
                    </li>

                </ul>
            </div>
        </nav>


    );
}

export default NavBar;
