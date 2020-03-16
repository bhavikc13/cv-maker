import React, { Component } from "react";
import Layout1 from "./../template-1/Layout1";
import Sidebar from "./../template-1/Sidebar";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CvEditor extends Component {
  componentDidMount() {
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
        <div className="container-fluid">
          <Sidebar id={this.props.match.params.id} />
          <Layout1 />
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
