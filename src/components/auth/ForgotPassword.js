import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import firebase from "./../../firebase/fbConfig";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";
import "../style/signinStyle.css";
import { faEye as eyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye as eyeRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ForgotPassword extends Component {
  state = {
    email: "",
    isLoading: true,
    error: "",
    emailSent: false,
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
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log("email sent");
        this.setState({ isLoading: false, emailSent: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, error: err.message });
      });
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
    if (this.state.emailSent) {
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
          <h5 className="form-title title1SignIn">Forgot Password</h5>

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

          <center>
            <div>
              <button
                data-testid=""
                type="submit"
                className="btn btn-primary"
                style={{ margin: "10px" }}
              >
                Send a reset password email
              </button>
            </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
