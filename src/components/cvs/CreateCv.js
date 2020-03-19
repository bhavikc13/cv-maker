import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import Loader from "./../loader/Loader";

class CreateCV extends Component {
  state = {
    title: "",
    isLoading: true
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  handleAddCv = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    let cv = this.state,
      userId = this.props.auth.uid;
    firestore
      .collection("users")
      .doc(userId)
      .collection("cvs")
      .add({
        title: cv.title,
        updatedAt: new Date(),
        userId: userId,
        imageUploaded: false
      })
      .then(resp => {
        console.log("cv added");
        this.setState({ isLoading: false });
        this.props.history.push("/" + resp.id);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
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
    return this.state.isLoading ? (
      <Loader />
    ) : (
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
