import React, { Component } from "react";
import Layout1 from "./../template-1/Layout1";
import SidebarAndLayout from "../template-1/SidebarAndLayout";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";

class CvEditor extends Component {
  state = { isLoading: true };
  componentDidMount() {
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
        <div className="container-fluid">
          <SidebarAndLayout id={this.props.match.params.id} />
          {/*<Layout1 />*/}
          {/*<NavbarBottom
            id={this.props.match.params.id}
            push={this.props.history.push}
          />*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(CvEditor);
