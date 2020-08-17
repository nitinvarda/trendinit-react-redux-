import axios from 'axios';

// as soon the loader functions finds a token which is an authentication token
// setAuthToken will set that token into headers 
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        // if no token is find it deletes
        delete axios.default.headers.common['x-auth-token'];
    }


}

export default setAuthToken;