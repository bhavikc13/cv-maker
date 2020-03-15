import React, { Component } from "react";
import CvList from "../cvs/CvList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { cvs, auth } = this.props;
    console.log(this.props);
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return <CvList cvs={cvs} auth={auth} />;
  }
}

const mapStateToProps = state => {
  return {
    cvs: state.firestore.ordered.cvs,
    auth: state.firebase.auth
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "cvs",
      orderBy: ["createdAt", "asc"]
    },
    {
      collection: "profile"
    },
    {
      collection: "education"
    },
    {
      collection: "internship"
    },
    {
      collection: "project"
    },
    {
      collection: "position"
    },
    {
      collection: "award"
    },
    {
      collection: "hobby"
    },
    {
      collection: "skill"
    }
  ]),
  connect(mapStateToProps)
)(Dashboard);
