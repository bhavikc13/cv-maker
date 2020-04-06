import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "./../../firebase/fbConfig";
import firestore from "./../../firebase/firestore";
import Loader from "./../loader/Loader";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isLoading: true,
    error: ""
  };
  componentDidMount() {
    if (this.props.auth.uid) {
      return <Redirect to="/" />;
    }
    this.setState({ isLoading: false });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            initials: this.state.firstName[0]
          });
      })
      .then(() => {
        console.log("signup success");
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false, error: err.message });
      });
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container" style={{ margin: "auto", padding: "50px" }}>
        <div className="card border-dark">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <h5 className="card-title text-center">Sign Up</h5>
              <div className="form-group">
                {/*<label htmlFor="firstName">First Name</label>*/}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  id="firstName"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                {/*<label htmlFor="lastName">Last Name</label>*/}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  id="lastName"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                {/*<label htmlFor="email">Email</label>*/}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                {/*<label htmlFor="password">Password</label>*/}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <div className="form-group text-center">
                {authError ? <p>{authError}</p> : null}
              </div>
              <div className="form-group text-center">
                {this.state.error ? <p>{this.state.error}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};
export default connect(mapStateToProps)(SignUp);
