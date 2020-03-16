import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import firestore from "./../../firebase/firestore";

class CreateCV extends Component {
  state = {
    title: ""
  };
  handleAddCv = e => {
    e.preventDefault();
    let cv = this.state,
      userId = this.props.auth.uid;
    firestore
      .collection("cvs")
      .add({
        ...cv,
        createdAt: new Date(),
        userId: userId
      })
      .then(resp => {
        console.log("cv added");
        this.props.history.push("/" + resp.id);
      })
      .catch(err => console.log(err));
  };
  handleChangeCvTitle = (e, id) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleAddCv}>
          <div className="form-group">
            <label>CV Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.handleChangeCvTitle}
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
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(CreateCV);
