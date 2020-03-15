import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { updateEducation } from "../../store/actions/cvActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Education extends Component {
  state = {
    collegeName: "",
    id: ""
  };
  handleClick = e => {
    e.preventDefault();
    this.props.updateEducation(this.state);
    if (e.target.id === "Previous") {
      this.props.push("/" + this.props.id + "/profile");
    } else if (e.target.id === "Next") {
      this.props.push("/" + this.props.id + "/skills");
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  componentDidMount() {
    console.log(this.props);
    this.setState({
      id: this.props.id
    });
    if (this.props.education.length === 0) return null;
    let d = this.props.education.filter(d => d.id === this.props.id);
    this.setState({
      collegeName: d[0].collegeName
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
          <h5>Education</h5>
          <div className="form-group">
            <label htmlFor="collegename">College Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter College Name"
              id="collegeName"
              onChange={this.handleChange}
              value={this.state.collegeName}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleClick}
              id="Previous"
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleClick}
              id="Next"
            >
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
    education: state.firestore.ordered.education
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEducation: d => dispatch(updateEducation(d))
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(Education);
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
)(Education);
