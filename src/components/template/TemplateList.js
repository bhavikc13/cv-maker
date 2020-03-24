import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/loader.css";
import Loader from "./../loader/Loader";
import moment from "moment";
import { Redirect } from "react-router-dom";

class TemplateList extends Component {
  state = { isLoading: true, title: "", templateId: null };

  componentWillUnmount() {}
  componentDidMount() {
    this.props.updatePrevUrl(window.location.pathname);
    if (this.props.location.changeTemplate) {
      firestore
        .collection("users")
        .doc(this.props.auth.uid)
        .collection("cvs")
        .doc(this.props.location.id)
        .get()
        .then(resp => {
          this.setState({
            title: resp.data().title,
            isLoading: false,
            templateId: resp.data().templateId
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: false });
    }
  }
  handleClick = templateId => {
    if (this.props.location.changeTemplate) {
      firestore
        .collection("users")
        .doc(this.props.auth.uid)
        .collection("cvs")
        .doc(this.props.location.id)
        .update({
          updatedAt: new Date(),
          templateId: templateId
        })
        .then(() => console.log("update date and time.\nupdate template id"))
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="row" style={{ margin: "5px" }}>
        {this.props.location.changeTemplate === false ? (
          <React.Fragment>
            <div
              className="col-md-2 col-sm-4"
              key={1}
              style={{
                marginTop: "10px"
              }}
            >
              <div
                className="card border-dark"
                style={{
                  minHeight: "200px"
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">Template 1</h5>
                  <p className="card-text"></p>
                  <Link
                    to={{
                      pathname: "/createcv",
                      templateId: 1
                    }}
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-md-2 col-sm-4"
              key={2}
              style={{
                marginTop: "10px"
              }}
            >
              <div
                className="card border-dark"
                style={{
                  minHeight: "200px"
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">Template 2</h5>
                  <p className="card-text"></p>
                  <Link
                    to={{
                      pathname: "/createcv",
                      templateId: 2
                    }}
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
        {this.props.location.changeTemplate === true &&
        this.state.templateId !== 1 ? (
          <div
            className="col-md-2 col-sm-4"
            key={1}
            style={{
              marginTop: "10px"
            }}
          >
            <div
              className="card border-dark"
              style={{
                minHeight: "200px"
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Template 1</h5>
                <p className="card-text"></p>
                <Link
                  onClick={() => {
                    this.handleClick(1);
                  }}
                  to={"/" + this.props.location.id}
                  className="stretched-link"
                ></Link>
              </div>
            </div>
          </div>
        ) : null}
        {this.props.location.changeTemplate === true &&
        this.state.templateId !== 2 ? (
          <div
            className="col-md-2 col-sm-4"
            key={2}
            style={{
              marginTop: "10px"
            }}
          >
            <div
              className="card border-dark"
              style={{
                minHeight: "200px"
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Template 2</h5>
                <p className="card-text"></p>
                <Link
                  to={"/" + this.props.location.id}
                  className="stretched-link"
                  onClick={() => {
                    this.handleClick(2);
                  }}
                ></Link>
              </div>
            </div>
          </div>
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
