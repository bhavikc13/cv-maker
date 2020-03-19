import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "./../../firebase/fbConfig";
import "./../css/button.css";

class SignedInLinks extends Component {
  state = {
    isLoading: true,
    error: ""
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  handleSignOut = e => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout success");
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false, error: err.message });
      });
  };
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button
            className="btn btn-outline-secondary"
            onClick={this.handleSignOut}
          >
            Sign Out
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary btn-circle btn-sm">
            {this.props.profile.initials}
          </button>
        </li>
      </ul>
    );
  }
}

export default SignedInLinks;
