import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import defaultAvatar from '../images/defaultAvatar.jpg'

import {logOutUser} from '../store/actions/authentication.action';

class Navbar extends Component {

    handleLogout(e){
        e.preventDefault()
        this.props.logOutUser(this.props.history)
    }

  render() {
    const {user, isAuthenticated} = this.props.auth
    const member = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.handleLogout.bind(this)}>
                    <img src={defaultAvatar} alt={user.username} title={user.username} className="rounded-circle"
                    style={{ width: '25px', marginRight: '5px'}} />
                        Logout
                </Link>
            </li>
        </ul>
    )

    const guest = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/new">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
    )

    return ( 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/" className="nav-link">Drybbble</Link>
            </li>
        </ul>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated ? member : guest }
        </div>
    </nav>
    );
  }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
 
export default connect(mapStateToProps, {logOutUser})(withRouter(Navbar))