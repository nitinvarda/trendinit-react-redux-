import React, { useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './redux/actions/Login';
import Admin from './components/Admin/adminLogin/admin';
import store from './store';
import setAuthToken from './setAuthToken';
import AdminHome from './components/Admin/adminHome/adminHome';
import Navbar from './components/navbar/NavBar';
import Add from './components/Admin/posts/addPost/add';
import Edit from './components/Admin/posts/editPost/edit';
import Post from './components/Homepage/posts/post/Post';
import by from './components/Homepage/posts/by/byAdmin';
import Adminpost from './components/Admin/posts/adminpost/adminPost';
import Categories from './components/Homepage/categories/categories';
import ContacUs from './components/navbar/contacUs';
import Footer from './components/navbar/Footer';



//  updation
import HomeScreen from './components/Homepage/mainpage/HomeScreen';
import OtherPages from './components/Homepage/mainpage/OtherPages';



if (localStorage.token) {
  setAuthToken(localStorage.token);

}


function App() {
  // we are checking for authentication as soon this component is rendered
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="main">
        <div className="App">


          <Switch>
            <Route path="/" exact strict component={HomeScreen} />

            <Route path="/admin" component={Admin} />
            <Route path="/admin-home" component={AdminHome} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/post/:id" component={Post} />
            <Route path="/category/:type" component={Categories} />
            <Route path="/by/:name" component={by} />
            <Route path="/page/:pageNumber" component={OtherPages} />
            <Route path="/admin-post/:id" component={Adminpost} />
            <Route path="/contact" exact component={ContacUs} />
          </Switch>


        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
