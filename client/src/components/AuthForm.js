import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      errors: {}
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
    console.log(user)
  }

  render() { 
    const {heading, buttonText, SignUp} = this.props
    const {username, email, password, password_confirm} = this.state
    return ( 
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>{heading}</h2>
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor="username">Username</label>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    name="username"
                    onChange={ this.handleInputChange }
                    value={ username }
                    />
                </div>
                {SignUp && (
                    <React.Fragment>
                        <label htmlFor="email">Email</label>
                        <div className="form-group">
                            <input
                            type="email"
                            placeholder="ex: user@example.com"
                            className="form-control"
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ email }
                            />
                        </div>
                    </React.Fragment>
                )}
                <label htmlFor="password">Password</label>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ password }
                    />
                </div>
                {SignUp && (
                <React.Fragment>
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        name="password_confirm"
                        onChange={ this.handleInputChange }
                        value={ password_confirm }
                        />
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
 
export default RegisterForm;