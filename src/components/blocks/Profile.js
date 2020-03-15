import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { updateProfile } from "../../store/actions/cvActions";
import { getProfile } from "../../store/getData";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Profile extends Component {
  state = {
    fullName: "",
    instituteName: "",
    email: "",
    dob: "",
    address: "",
    id: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.updateProfile(this.state);
    this.props.push("/" + this.props.id + "/education");
  };
  componentDidMount() {
    this.setState({
      id: this.props.id
    });
    if (this.props.profiles.length === 0) return null;
    let profile = this.props.profiles.filter(
      profile => profile.id === this.props.id
    );
    console.log(profile);
    this.setState({
      fullName: profile[0].fullName,
      email: profile[0].email,
      dob: profile[0].dob,
      address: profile[0].address,
      instituteName: profile[0].instituteName
    });
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h5>Profile</h5>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              id="fullName"
              onChange={this.handleChange}
              value={this.state.fullName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="institutename">Institute Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Institute Name"
              id="instituteName"
              onChange={this.handleChange}
              value={this.state.instituteName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">DOB</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter DOB"
              id="dob"
              onChange={this.handleChange}
              value={this.state.dob}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Adress</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              id="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profiles: state.firestore.ordered.profiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: profile => dispatch(updateProfile(profile))
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "cvs",
      orderBy: ["createdAt", "asc"]
    },
    {
      collection: "profiles"
    },
    {
      collection: "education"
    }
  ])
)(Profile);
