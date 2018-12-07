import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render() { 
    return ( 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="nav-link">Drybbble</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/new" className="nav-link">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signin" className="nav-link">Login</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
  }
}
 
export default Navbar;