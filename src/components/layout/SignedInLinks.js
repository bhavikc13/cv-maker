import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button className="btn btn-outline-secondary" onClick={props.signOut}>
          Sign Out
        </button>
      </li>
      <li className="nav-item">
        <a className="nav-link btn-floating btn-secondary">
          {props.profile.initials}
        </a>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
