import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "./../../firebase/fbConfig";
import "./../css/button.css";
import { OverlayTrigger, Popover } from "react-bootstrap";

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

  hidePopover = () => {
    setTimeout(() => this.refs.overlay.handleHide(), 250);
  };

  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover onMouseLeave={this.hidePopover}>
                <Popover.Content>
                  <div className="container-fluid">
                    <h4>
                      {this.props.profile.firstName}{" "}
                      {this.props.profile.lastName}
                    </h4>
                    <h5>{this.props.auth.email}</h5>
                    <div className="row container-fluid">
                      <Link
                        to={{
                          pathname: "/feedback",
                          prevUrl: this.props.prevUrl
                        }}
                        onClick={this.hidePopover}
                      >
                        Any Feedback?
                      </Link>
                    </div>
                    <button
                      className="btn btn-outline-secondary float-right"
                      onClick={this.handleSignOut}
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    >
                      Sign Out
                    </button>
                  </div>
                </Popover.Content>
              </Popover>
            }
            rootClose
            ref="overlay"
          >
            <button className="btn btn-secondary btn-circle btn-sm">
              {this.props.profile.initials}
            </button>
          </OverlayTrigger>
        </li>
      </ul>
    );
  }
}

const mapStatesToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    prevUrl: state.prevUrlRed.prevUrl
  };
};

export default connect(mapStatesToProps)(SignedInLinks);
