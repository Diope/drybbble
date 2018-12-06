import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render() { 
    return ( 
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">Drybbble</Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Link to="/new" className="nav-link">Sign Up</Link>
                </li>
                <li class="nav-item">
                    <Link to="/signin" className="nav-link">Login</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
  }
}
 
export default Navbar;