import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class SignedOutLinks extends Component {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="btn btn-outline-success" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-outline-success" to="/signin">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}

export default SignedOutLinks;
