import React, { Component } from "react";
import { createCV } from "../../store/actions/cvActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class CreateCV extends Component {
  state = {
    title: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createCV(this.state);
    this.props.history.push("/" + this.props.cvs[this.props.cvs.length - 1].id);
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>CV Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    cvs: state.firestore.ordered.cvs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCV: cv => dispatch(createCV(cv))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCV);
