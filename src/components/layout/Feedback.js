import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import firestore from "../../firebase/firestore";
import Loader from "./../loader/Loader";

class Feedback extends React.Component {
  state = {
    review: "",
    reviewError: "",
    isLoading: true
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    let fd = this.state,
      userId = this.props.auth.uid;
    firestore
      .collection("users")
      .doc(userId)
      .collection("feedbacks")
      .add({
        review: fd.review,
        createdAt: new Date(),
        userId: userId
      })
      .then(resp => {
        console.log("feedback added");
        this.setState({ isLoading: false });
        this.props.history.push(this.props.location.prevUrl);
        //alert(`Feedback submitted successfully! \n `);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
        //alert(`Feedback cannot be submitted due to some error! \n `);
      });
  };

  handleChangeFeedback = e => {
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Feedback</label>
            <textarea
              type="text"
              className="form-control"
              id="review"
              onChange={this.handleChangeFeedback}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Submit
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

export default connect(mapStateToProps)(Feedback);
