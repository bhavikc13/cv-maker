/*import { Link } from "react-router-dom";
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
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CvList);*/

import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import storage from "./../../firebase/storage";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./../css/loader.css";
import Loader from "./../loader/Loader";
import moment from "moment";
import { Redirect } from "react-router-dom";
import trashCV from "../AddImage/trashCV2.png";
import cardBG from "../AddImage/cardBG.png";

class CvList extends Component {
  state = { isLoading: true, show: false, cvId: "", isDeleting: false };
  componentDidMount() {
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
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
              let sz = cvs.length;
              for (let i = 0; i < sz; i++) {
                let cv = cvs[i].data();
                let newCv = {
                  id: cvs[i].id,
                  title: cv.title,
                  userId: cv.userId,
                  updatedAt: cv.updatedAt,
                  imageUploaded: cv.imageUploaded,
                };
                this.props.addCv(newCv);
                this.setState({ isLoading: false });
              }
            })
            .catch((err) => {
              console.log(err);
              this.setState({ isLoading: false });
            });
        } else {
          this.setState({ isLoading: false });
          alert("No saved CV yet!");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  handleRemoveCv = (id) => {
    this.setState({ isLoading: true });
    let imageUploaded = false;
    for (let i = 0; i < this.props.cvList.length; i++) {
      if (this.props.cvList[i].id === id) {
        imageUploaded = this.props.cvList[i].imageUploaded;
      }
    }
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
        if (imageUploaded) {
          let deleteRef = storage
            .ref()
            .child("profileImages/" + id)
            .delete();
          deleteRef
            .then(() => {
              console.log("image deleted");
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
                  let sz = cvs.length;
                  for (let i = 0; i < sz; i++) {
                    let cv = cvs[i].data();
                    let newCv = {
                      id: cvs[i].id,
                      title: cv.title,
                      userId: cv.userId,
                      updatedAt: cv.updatedAt,
                    };
                    this.props.addCv(newCv);
                    this.setState({ isLoading: false });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.setState({ isLoading: false });
                });
            } else {
              this.setState({ isLoading: false });
              alert("No saved CV yet!");
              this.props.history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  setShow = (val, cvID) => {
    this.setState({
      show: val,
      cvId: cvID,
    });
  };

  handleClose = () => this.setShow(false);
  handleShow = (cvID) => this.setShow(true, cvID);

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
      <div
        className="container-fuild justify-content-md-center"
        data-testid="cvListTestId"
      >
        {this.props.cvList
          .filter((cv) => cv.userId === this.props.auth.uid)
          .map((cv) => {
            return (
              <div
                className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
                key={cv.id}
                style={{
                  marginTop: "15px",
                  display: "inline-block",
                }}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={cardBG}
                    style={{
                      border: "white",
                      width: "100%",
                      height: "20vh",
                    }}
                  />
                  <Card.Body style={{ background: "#404040" }}>
                    <Card.Title
                      className="text-center"
                      style={{ color: "white" }}
                    >
                      {cv.title}
                    </Card.Title>
                    <Link
                      to={"/cvlist/" + cv.id}
                      className="stretched-link"
                      data-testid={cv.title}
                    />

                    {/*<Button
                    variant="primary"
                    onClick={()=>{this.handleShow(cv.id)}}
                    style={{zIndex: '3', 
                            position: 'relative'}}
                  >
                  Preview
                  </Button>*/}
                    <div className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          this.handleRemoveCv(cv.id);
                        }}
                        style={{
                          position: "relative",
                          zIndex: "3",
                        }}
                        data-testid={"remove" + cv.title + "TestId"}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>

                  <Card.Footer>
                    <small className="text-muted">
                      Last updated {moment(cv.updatedAt.toDate()).calendar()}
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    cvList: state.cvRed.cvList,
    prevUrl: state.prevUrlRed.prevUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCv: (newCv) => {
      dispatch({ type: "ADD_CV", newCv: newCv });
    },
    removeCv: (id) => {
      dispatch({ type: "REMOVE_CV", id: id });
    },
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
      });
    },
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

/*<div className="container-fuild"
          style={{height: '100%', 
                    background: '#202020'}}
      >
        <div>
          {this.props.cvList
            .filter(cv => cv.userId === this.props.auth.uid)
            .map(cv => {
              return (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
                  key={cv.id}
                  style={{ margin: '20px 10px 10px 20px', display: 'inline-block'}} 
                >

                  <Card >
                    <Card.Img
                      variant="top" 
                      src={cardBG}
                      style={{
                        border: "white",
                        width: '100%',
                        height: '25vh',
                      }}
                    />
                    <Card.Body style={{background: '#C0C0C0'}}>
                      <Card.Title 
                        className="text-center"
                        style={{color: '3300FF'}}
                      >
                        {cv.title}
                      </Card.Title>
                      <Link to={"/" + cv.id}
                            className="stretched-link"
                      />

                      {/*<Button
                        variant="primary"
                        onClick={()=>{this.handleShow(cv.id)}}
                        style={{zIndex: '3', 
                                position: 'relative'}}
                      >
                      Preview
                      </Button>* /}

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          this.handleRemoveCv(cv.id);
                        }}
                        style={{float: 'left',
                                position: 'relative',
                                left: '34%',
                                zIndex: '3', }}
                       > Remove
                       </Button>
                    </Card.Body> 
                    <Card.Footer>
                      <small className="text-muted">
                        Last updated {moment(cv.updatedAt.toDate()).calendar()}
                      </small>
                    </Card.Footer>
                  </Card>

                  <Modal key={cv.id} 
                        show={this.show} 
                        onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{cv.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      asdf
                    </Modal.Body>
                  </Modal>

                  {/*<div
                    className="card"
                    style={{
                      background: 'whitesmoke',
                      border: "white"
                    }}
                  >
                    <div className='overflow'>
                      <img className="card-img-top" 
                            src={cardBG}
                      />

                      <img
                        className="card-img-top"
                        src={trashCV}
                        alt="trash"
                        onClick={() => {
                          this.handleRemoveCv(cv.id);
                        }}
                        style={{
                          right: '0',
                          zIndex: "2",
                          width: '10px',
                          height: '10px',
                        }}
                       />
                    </div>

                    <div className="card text-center" 
                          style={{ background: 'black',
                                    border: "white" }}
                    >

                      <div className="card-body">
                        <h5 className="card-title">
                          {cv.title}
                        </h5>
                        <p className="card-text">qwert</p>
                        <Link to={"/" + cv.id} className="stretched-link"></Link>
                      </div>
                      
                      <div className="card-stats">
                        <small className="card-footer
                                          text-muted"
                        >
                          Last updated {moment(cv.updatedAt.toDate()).calendar()}
                        </small>
                      </div>
                    </div>

                  </div>* /}
                </div>
              );
            })}
        </div>
      </div>*/
