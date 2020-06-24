import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "./../../firebase/fbConfig";
import firestore from "./../../firebase/firestore";
import Loader from "./../loader/Loader";
import "../style/signupStyle.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isLoading: true,
    error: "",
    showPassword: false,
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          initials: this.state.firstName[0],
        });
      })
      .then(() => {
        console.log("signup success");
        let user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: this.state.firstName + " " + this.state.lastName,
          })
          .then(() => {
            console.log("displayName updated");
            user
              .sendEmailVerification()
              .then(() => {
                console.log("verification email sent");
                this.setState({
                  isLoading: false,
                });
              })
              .catch((err) => {
                console.log(err);
                this.setState({ isLoading: false, error: err.message });
              });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false, error: err.message });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, error: err.message });
      });
  };
  handleShowPassword = (e) => {
    if (this.state.showPassword === false) {
      this.setState({
        showPassword: true,
      });
    } else {
      this.setState({
        showPassword: false,
      });
    }
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid && auth.emailVerified === false) {
      return (
        <div style={{ marginTop: "50px" }} className="container">
          <p style={{ color: "white", textAlign: "center" }}>
            We have sent you mail on your registered email ID for verification.
          </p>
          <p style={{ color: "white", textAlign: "center" }}>
            Please check your inbox!!
          </p>
          <p style={{ color: "white", textAlign: "center" }}>
            After verifying your email ID refresh the browser page.
          </p>
        </div>
      );
    }
    if (auth.uid) {
      return <Redirect to="/" />;
    }
    if (this.state.isLoading) {
      return <Loader />;
    } else {
      return (
        <div className="conatinerSignUp" data-testid="signUpTestId">
          <div className="bgsignup"></div>
          <form
            onSubmit={this.handleSubmit}
            className="form-conatinerSignUp"
            style={{ borderRadius: "25px" }}
          >
            <h5 className="title1SignUp form-title">Sign Up</h5>
            <div className="form-groupSignUp" style={{ marginTop: "10px" }}>
              {/*<label htmlFor="firstName" className="title2SignUp">
              First Name
    </label>*/}
              <input
                data-testid="firstNameInputId"
                type="text"
                className="form-control"
                placeholder="Enter first name"
                id="firstName"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-groupSignUp" style={{ marginTop: "10px" }}>
              {/*<label htmlFor="lastName" className="title2SignUp">
              Last Name
  </label>*/}
              <input
                data-testid="lastNameInputId"
                type="text"
                className="form-control"
                placeholder="Enter last name"
                id="lastName"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-groupSignUp" style={{ marginTop: "10px" }}>
              {/*<label htmlFor="email" className="title2SignUp">
              Email
</label>*/}
              <input
                data-testid="emailInputId"
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-groupSignUp" style={{ marginTop: "10px" }}>
              {/*<label htmlFor="password" className="title2SignUp">
              Password
</label>*/}
              <input
                data-testid="passwordInputId"
                type={this.state.showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                id="password"
                onChange={this.handleChange}
                required
              />
              {this.state.showPassword === true ? (
                <FontAwesomeIcon
                  className="showPassword float-right"
                  icon={faEyeSlash}
                  onClick={this.handleShowPassword}
                />
              ) : null}
              {this.state.showPassword === false ? (
                <FontAwesomeIcon
                  className="showPassword float-right"
                  icon={faEye}
                  onClick={this.handleShowPassword}
                />
              ) : null}
            </div>
            <center style={{ margin: "10px" }}>
              <button
                type="submit"
                className="btn btn-primary"
                data-testid="signUpButtonTestId"
              >
                Sign Up
              </button>
            </center>
            <div className="form-groupSignUp text-center">
              {authError ? <p style={{ color: "white" }}>{authError}</p> : null}
            </div>
            <div className="form-groupSignUp text-center">
              <p style={{ color: "white" }} data-testid="errorTestId">
                {this.state.error}
              </p>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
export default connect(mapStateToProps)(SignUp);
