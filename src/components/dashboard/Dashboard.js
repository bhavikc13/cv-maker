import React, { Component } from "react";
import CvList from "../cvs/CvList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = { isLoading: true };
  componentDidMount() {
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
      <div
        className="row"
        style={{ position: "absolute", left: "30%", top: "30%" }}
      >
        <div>
          <div
            className="card border-dark"
            style={{ minHeight: "200px", margin: "30px" }}
          >
            <div className="card-body">
              <h5 className="card-title">Use existing CVs</h5>
              <p className="card-text"></p>
              <Link to="/cvlist" className="stretched-link"></Link>
            </div>
          </div>
        </div>

        <div>
          <div
            className="card border-dark"
            style={{ minHeight: "200px", margin: "30px" }}
          >
            <div className="card-body">
              <h5 className="card-title">Create New Cv</h5>
              <p className="card-text"></p>
              <Link
                to={{
                  pathname: "/templatelist",
                  changeTemplate: false
                }}
                className="stretched-link"
              ></Link>
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
