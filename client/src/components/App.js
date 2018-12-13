import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {setCurrentUser} from '../store/actions/authentication.action'

import store from '../store/store';
import NavBar from '../containers/NavBar';
import MainContainer from '../containers/MainContainer';

if (localStorage.jwtToken) {
  try {
    setAuthToken(localStorage.jwtToken);
    let decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded));
  } catch (err) {
    store.dispatch(setCurrentUser({}))
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="Onboard">
        <NavBar />
        <MainContainer />
      </div>
    </Router>
  </Provider>
);
 
export default App;