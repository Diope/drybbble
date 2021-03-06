import React from 'react';
import {Switch, Route } from 'react-router-dom'

import HomePage from '../containers/HomePage'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm';
import PostAll from '../components/PostAll' 

const MainContainer = () => {
  return ( 
    <div className="container">
      <Switch>
        <Route exact path="/" component={PostAll} />
        <Route exact path="/new" render={props =>{
          return (
          <RegisterForm
            heading="Welcome to Drybbble"
            buttonText="Sign Up"
            SignUp
          />
          )
        }}
      />
      <Route exact path="/login" render={props => {
        return (
          <LoginForm
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