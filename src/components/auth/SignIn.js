import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import firebase from "./../../firebase/fbConfig";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";
import "../style/signinStyle.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isLoading: true,
    error: "",
    showPassword: false,
  };
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("signin success");
        let user = firebase.auth().currentUser;
        if (!user.emailVerified) {
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
        } else {
          this.setState({
            isLoading: false,
          });
        }
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
    if (auth.uid && !auth.emailVerified) {
      return (
        <div style={{ marginTop: "50px" }}>
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
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="containerSignIn" data-testid="signInTestId">
        <div className="bgsignin"></div>

        <form
          onSubmit={this.handleSubmit}
          className="form-conatinerSignIn"
          style={{ borderRadius: "25px" }}
        >
          <h5 className="form-title title1SignIn">Sign In</h5>

          <div className="form-groupSignIn" style={{ margin: "15px" }}>
            {/*<label htmlFor="email" className="title2SignIn">
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
          <div className="form-groupSignIn" style={{ margin: "15px" }}>
            {/*<label htmlFor="password" className="title2SignIn">
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

          <center>
            <div>
              <button
                data-testid="signInButtonTestId"
                type="submit"
                className="btn btn-primary"
                style={{ margin: "10px" }}
              >
                Sign In
              </button>
            </div>
            <div style={{ margin: "10px", fontSize: "18px", color: "#fff" }}>
              <Link to="/forgotpassword" style={{ color: "white" }}>
                Forgot password?
              </Link>
            </div>
            {
              <div style={{ margin: "10px", fontSize: "18px", color: "#fff" }}>
                New user?
                <Link to="/signup">
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ margin: "5px" }}
                    data-testid="signUpButtonTestId"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            }
          </center>

          <div className="form-group text-center">
            {authError ? <p style={{ color: "white" }}>{authError}</p> : null}
          </div>
          <div className="form-group text-center">
            <p style={{ color: "white" }} data-testid="errorTestId">
              {this.state.error}
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
