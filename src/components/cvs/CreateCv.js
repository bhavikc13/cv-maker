import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import Loader from "./../loader/Loader";
import "../style/cvtitleStyle.css";

const orderOfBlocks = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
];
const orderOfSkillBlocks = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

class CreateCV extends Component {
  state = {
    title: "",
    isLoading: true,
    error: "",
  };
  componentDidMount() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    this.props.updatePrevUrl(window.location.pathname);
    this.setState({ isLoading: false });
  }
  handleAddCv = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    let cv = this.state,
      userId = this.props.auth.uid;

    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .get()
      .then((resp) => {
        if (resp.docs.length > 0) {
          firestore
            .collection("users")
            .doc(this.props.auth.uid)
            .collection("cvs")
            .orderBy("createdAt")
            .get()
            .then((resp) => {
              let cvs = resp.docs;
              let sz = cvs.length,
                ok = true;
              for (let i = 0; i < sz; i++) {
                if (cv.title === cvs[i].data().title) {
                  ok = false;
                }
              }
              if (!ok) {
                this.setState({
                  isLoading: false,
                  error: "CV with this name already exists.",
                });
              } else if (ok) {
                if (this.props.location.templateId === 1) {
                  firestore
                    .collection("users")
                    .doc(userId)
                    .collection("cvs")
                    .add({
                      title: cv.title,
                      orderOfBlocks: orderOfBlocks,
                      orderOfEducationBlocks: [],
                      orderOfInternshipBlocks: [],
                      orderOfProjectBlocks: [],
                      orderOfPositionBlocks: [],
                      orderOfAwardBlocks: [],
                      orderOfHobbyBlocks: [],
                      orderOfSkillBlocks: orderOfSkillBlocks,
                      updatedAt: new Date(),
                      createdAt: new Date(),
                      userId: userId,
                      imageUploaded: false,
                      templateId: this.props.location.templateId,
                    })
                    .then((resp) => {
                      console.log("cv added");
                      this.setState({ isLoading: false });
                      this.props.history.push("/cvlist/" + resp.id);
                    })
                    .catch((err) => {
                      console.log(err);
                      this.setState({ isLoading: false });
                    });
                } else if (this.props.location.templateId === 2) {
                  firestore
                    .collection("users")
                    .doc(userId)
                    .collection("cvs")
                    .add({
                      title: cv.title,
                      updatedAt: new Date(),
                      createdAt: new Date(),
                      userId: userId,
                      imageUploaded: false,
                      templateId: this.props.location.templateId,
                    })
                    .then((resp) => {
                      console.log("cv added");
                      this.setState({ isLoading: false });
                      this.props.history.push("/cvlist/" + resp.id);
                    })
                    .catch((err) => {
                      console.log(err);
                      this.setState({ isLoading: false });
                    });
                }
              }
            })
            .catch((err) => {
              console.log(err);
              this.setState({ isLoading: false });
            });
        } else {
          if (this.props.location.templateId === 1) {
            firestore
              .collection("users")
              .doc(userId)
              .collection("cvs")
              .add({
                title: cv.title,
                orderOfBlocks: orderOfBlocks,
                orderOfEducationBlocks: [],
                orderOfInternshipBlocks: [],
                orderOfProjectBlocks: [],
                orderOfPositionBlocks: [],
                orderOfAwardBlocks: [],
                orderOfHobbyBlocks: [],
                orderOfSkillBlocks: orderOfSkillBlocks,
                updatedAt: new Date(),
                createdAt: new Date(),
                userId: userId,
                imageUploaded: false,
                templateId: this.props.location.templateId,
              })
              .then((resp) => {
                console.log("cv added");
                this.setState({ isLoading: false });
                this.props.history.push("/cvlist/" + resp.id);
              })
              .catch((err) => {
                console.log(err);
                this.setState({ isLoading: false });
              });
          } else if (this.props.location.templateId === 2) {
            firestore
              .collection("users")
              .doc(userId)
              .collection("cvs")
              .add({
                title: cv.title,
                updatedAt: new Date(),
                createdAt: new Date(),
                userId: userId,
                imageUploaded: false,
                templateId: this.props.location.templateId,
              })
              .then((resp) => {
                console.log("cv added");
                this.setState({ isLoading: false });
                this.props.history.push("/cvlist/" + resp.id);
              })
              .catch((err) => {
                console.log(err);
                this.setState({ isLoading: false });
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  handleChangeCvTitle = (e, id) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    const { auth } = this.props;
    if (auth.uid && auth.emailVerified === false) {
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
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="containerTitle" data-testid="createCvTestId">
        <div className="bgtitle"></div>
        <form
          onSubmit={this.handleAddCv}
          className="form-conatinerTitle"
          style={{ borderRadius: "25px" }}
        >
          <div className="form-groupTitle">
            <center>
              <label className="title2Title form-title">CV Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={this.handleChangeCvTitle}
                required
                placeholder="CV Title..."
              />
            </center>
          </div>
          <div className="form-groupTitle">
            <center>
              <button
                className="btn btn-primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                Create
              </button>
            </center>
          </div>
          <div className="form-group text-center">
            {this.state.error ? (
              <p style={{ color: "white" }}>{this.state.error}</p>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCV);
