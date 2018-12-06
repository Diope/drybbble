import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { 
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      errors: {}
     }

     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm
    }
    console.log(user)
  }

  render() { 
    return ( 
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor="username">Username</label>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    name="username"
                    onChange={ this.handleInputChange }
                    value={ this.state.username }
                    />
                </div>
                <label htmlFor="email">Email</label>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="ex: user@example.com"
                    className="form-control"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                </div>
                <label htmlFor="passwoord">Password</label>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                </div>
                <label htmlFor="password_confirm">Confirm Password</label>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
     );
  }
}
 
export default RegisterForm;