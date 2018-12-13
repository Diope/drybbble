import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import {loginUser} from '../store/actions/authentication.action';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { 
      username: "",
      password: "",
      errors: {},
     }

     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(user, this.props.history)
  }

    componentWillReceiveProps (nextprops) {
        if (nextprops.auth.isAuthenticated) {
            this.props.push.history("/")
        }
        if(nextprops.errors !== this.state.errors) {
            this.setState({
                errors: nextprops.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }


  render() { 
    const {heading, buttonText} = this.props
    const {username, password, errors} = this.state;

    return ( 
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h1 style={{marginBottom: '40px'}}>{heading}</h1>
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor="username">Username</label>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="ex: JohnnyBravo95"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.username
                    })}
                    name="username"
                    onChange={ this.handleInputChange }
                    value={ username }
                    />
                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                </div>
              
                <label htmlFor="password">Password</label>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
     );
  }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps,{ loginUser })(withRouter(LoginForm))