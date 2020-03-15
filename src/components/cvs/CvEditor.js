import React, { Component } from "react";
import Layout1 from "./../template-1/Layout1";
import Sidebar from "./../template-1/Sidebar";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class CvEditor extends Component {
  componentDidUpdate() {
    window.onpopstate = e => {
      this.props.history.push("/");
    };
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <Sidebar
          id={this.props.match.params.id}
          profile={this.props.profile}
          education={this.props.education}
        />
        <Layout1 />
        <NavbarBottom
          id={this.props.match.params.id}
          push={this.props.history.push}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firestore.ordered.profile,
    education: state.firestore.ordered.education,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(CvEditor);
