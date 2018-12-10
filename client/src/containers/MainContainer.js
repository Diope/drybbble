import React from 'react';
import {Switch, Route } from 'react-router-dom'

import HomePage from '../components/HomePage'
import AuthForm from '../components/AuthForm'

const MainContainer = () => {
  return ( 
    <div className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" render={props =>{
          return (
          <AuthForm
            heading="Welcome to Drybbble"
            buttonText="Sign Up"
            SignUp
          />
          )
        }}
      />
      <Route exact path="/signin" render={props => {
        return (
          <AuthForm
            heading="Sign In"
            buttonText="Log In"
          />
        )
      }}
      />
      </Switch>
    </div>
   );
}
 
export default MainContainer;