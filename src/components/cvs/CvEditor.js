import React, { Component } from "react";
import Layout1 from "./../template-1/Layout1";
import SidebarAndLayout from "../template-1/SidebarAndLayout";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";

class CvEditor extends Component {
  state = { isLoading: true };
  componentDidMount() {
    this.props.updatePrevUrl(window.location.pathname);
    window.onpopstate = e => {
      this.props.history.push("/");
    };
    this.setState({ isLoading: false });
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container-fluid">
        <SidebarAndLayout id={this.props.match.params.id} />
        {/*<NavbarBottom
            id={this.props.match.params.id}
            push={this.props.history.push}
          />*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrevUrl: prevUrl => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvEditor);
