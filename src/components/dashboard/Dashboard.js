import React, { Component } from "react";
import CvList from "../cvs/CvList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";

class Dashboard extends Component {
  state = { isLoading: true };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? <Loader /> : <CvList auth={auth} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
