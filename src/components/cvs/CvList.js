import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/loader.css";
import Loader from "./../loader/Loader";
import moment from "moment";
import { Redirect } from "react-router-dom";

class CvList extends Component {
  state = { isLoading: true };
  componentDidMount() {
    let TcvList = this.props.cvList;
    let n = TcvList.length;
    for (let i = 0; i < n; i++) {
      this.props.removeCv(TcvList[i].id);
    }
    this.props.updatePrevUrl(window.location.pathname);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .get()
      .then(resp => {
        if (resp.docs.length > 0) {
          firestore
            .collection("users")
            .doc(this.props.auth.uid)
            .collection("cvs")
            .orderBy("createdAt")
            .get()
            .then(resp => {
              let cvs = resp.docs;
              let sz = cvs.length;
              for (let i = 0; i < sz; i++) {
                let cv = cvs[i].data();
                let newCv = {
                  id: cvs[i].id,
                  title: cv.title,
                  userId: cv.userId,
                  updatedAt: cv.updatedAt
                };
                this.props.addCv(newCv);
                this.setState({ isLoading: false });
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({ isLoading: false });
            });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  handleRemoveCv = id => {
    this.setState({ isLoading: true });
    this.props.removeCv(id);
    let TcvList = this.props.cvList;
    let n = TcvList.length;
    for (let i = 0; i < n; i++) {
      this.props.removeCv(TcvList[i].id);
    }
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(id)
      .delete()
      .then(() => {
        console.log("cv deleted");
        firestore
          .collection("users")
          .doc(this.props.auth.uid)
          .collection("cvs")
          .get()
          .then(resp => {
            if (resp.docs.length > 0) {
              firestore
                .collection("users")
                .doc(this.props.auth.uid)
                .collection("cvs")
                .orderBy("createdAt")
                .get()
                .then(resp => {
                  let cvs = resp.docs;
                  let sz = cvs.length;
                  for (let i = 0; i < sz; i++) {
                    let cv = cvs[i].data();
                    let newCv = {
                      id: cvs[i].id,
                      title: cv.title,
                      userId: cv.userId,
                      updatedAt: cv.updatedAt
                    };
                    this.props.addCv(newCv);
                    this.setState({ isLoading: false });
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.setState({ isLoading: false });
                });
            } else {
              this.setState({ isLoading: false });
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
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
      <div>
        <div className="row" style={{ margin: "5px" }}>
          {this.props.cvList
            .filter(cv => cv.userId === this.props.auth.uid)
            .map(cv => {
              return (
                <div
                  className="col-md-2 col-sm-4"
                  key={cv.id}
                  style={{
                    marginTop: "10px"
                  }}
                >
                  <div
                    className="card border-dark"
                    style={{
                      minHeight: "200px"
                    }}
                  >
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => {
                        this.handleRemoveCv(cv.id);
                      }}
                      style={{
                        marginLeft: "82%",
                        zIndex: "2"
                      }}
                    >
                      X
                    </button>
                    <div className="card-body">
                      <h5 className="card-title">{cv.title}</h5>
                      <p className="card-text"></p>
                      <Link to={"/" + cv.id} className="stretched-link"></Link>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Last updated {moment(cv.updatedAt.toDate()).calendar()}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    cvList: state.cvRed.cvList,
    prevUrl: state.prevUrlRed.prevUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCv: newCv => {
      dispatch({ type: "ADD_CV", newCv: newCv });
    },
    removeCv: id => {
      dispatch({ type: "REMOVE_CV", id: id });
    },
    updatePrevUrl: prevUrl => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvList);

/*<Link className="btn btn-light" to={"/" + cv.id}>
                    {cv.title}
                  </Link>
                  <span>
                    Last updated {moment(cv.updatedAt.toDate()).calendar()}
                  </span>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.handleRemoveCv(cv.id);
                    }}
                  >
                    X
                  </button>
                  
                  <Link className="btn btn-primary" to="/createcv">
          Create New Cv
        </Link>*/
