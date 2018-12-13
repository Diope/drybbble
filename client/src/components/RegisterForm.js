import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import {registerUser} from '../store/actions/authentication.action';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { 
      email: "",
      username: "",
      password: "",
      password_confirm: "",
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
        email: this.state.email,
        password: this.state.password,
        password_confirm: this.state.password_confirm
    }
    // const login = {
    //     username: this.state.username,
    //     password: this.state.password
    // }
        this.props.registerUser(user, this.props.history)
        // this.props.loginUser(login, this.props.history)
  }

    componentWillReceiveProps (nextprops) {
        if (nextprops.auth.isAuthenticated) {
            this.props.history.push("/")
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
    const {heading, buttonText, SignUp} = this.props
    const {username, email, password, password_confirm, errors} = this.state;

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
                {SignUp && (
                    <React.Fragment>
                        <label htmlFor="email">Email</label>
                        <div className="form-group">
                            <input
                            type="email"
                            placeholder="ex: user@example.com"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ email }
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                    </React.Fragment>
                )}
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
                {SignUp && (
                <React.Fragment>
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password_confirm
                        })}
                        name="password_confirm"
                        onChange={ this.handleInputChange }
                        value={ password_confirm }
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                </React.Fragment>
                )}
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

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps,{ registerUser })(withRouter(RegisterForm))