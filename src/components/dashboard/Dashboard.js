import React, { Component } from "react";
import CvList from "../cvs/CvList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = { isLoading: true };
  componentDidMount() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    this.props.updatePrevUrl(window.location.pathname);
    this.setState({ isLoading: false });
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-6 col-sm-12"
            key="1"
            style={{
              marginTop: "30px"
            }}
          >
            <div>
              <div
                className="card border-dark"
                style={{ minHeight: "300px", margin: "30px" }}
              >
                <div className="card-body">
                  <h2 className="card-title">Use existing CVs</h2>
                  <p className="card-text"></p>
                  <Link to="/cvlist" className="stretched-link"></Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-sm-12"
            key="2"
            style={{
              marginTop: "30px"
            }}
          >
            <div>
              <div
                className="card border-dark"
                style={{ minHeight: "300px", margin: "30px" }}
              >
                <div className="card-body">
                  <h2 className="card-title">Create New Cv</h2>
                  <p className="card-text"></p>
                  <Link to="/templatelist" className="stretched-link"></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
