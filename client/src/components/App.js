import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';

import store from '../store/store';
import NavBar from '../containers/NavBar';
import MainContainer from '../containers/MainContainer';

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