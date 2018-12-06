import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'

import NavBar from '../containers/NavBar';
import MainContainer from '../containers/MainContainer';

const App = () => (
  <Router>
    <div className="Onboard">
      <NavBar />
      <MainContainer />
    </div>
  </Router>
);
 
export default App;