import React, { Component } from 'react';
import {Switch, Route, withRouter } from 'react-router-dom'

import HomePage from '../components/HomePage'

const MainContainer = () => {
  return ( 
    <div className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
   );
}
 
export default MainContainer;