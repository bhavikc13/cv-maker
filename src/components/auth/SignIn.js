import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import firebase from "./../../firebase/fbConfig";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isLoading: true,
    error: ""
  };
  componentDidMount() {
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("signin success");
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
              <h5 className="card-title text-center">Sign In</h5>
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
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
                <div style={{ margin: "10px" }}>
                  New user? <Link to="/signup">Sign Up</Link>
                </div>
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
