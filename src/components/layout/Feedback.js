import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import firestore from "../../firebase/firestore";
import Loader from "./../loader/Loader";
import TextareaAutosize from "react-textarea-autosize";

class Feedback extends React.Component {
  state = {
    review: "",
    reviewError: "",
    isLoading: true
  };

  componentDidMount() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
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
      <div className="container" style={{ margin: "auto", padding: "50px" }}>
        <div className="card border-dark">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <h5 className="card-title text-center">Feedback</h5>
              <div className="form-group">
                <TextareaAutosize
                  type="text"
                  minRows="5"
                  className="form-control"
                  id="review"
                  onChange={this.handleChangeFeedback}
                  placeholder="Feedback..."
                  required
                />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
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
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Feedback);
