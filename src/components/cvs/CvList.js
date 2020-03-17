import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/loader.css";
import Loader from "./../loader/Loader";

class CvList extends Component {
  state = { isLoading: true };
  componentWillUnmount() {
    let TcvList = this.props.cvList;
    let n = TcvList.length;
    for (let i = 0; i < n; i++) {
      this.props.removeCv(TcvList[i].id);
    }
  }
  componentDidMount() {
    firestore
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
            createdAt: cv.createdAt
          };
          this.props.addCv(newCv);
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
      .collection("profile")
      .doc(id)
      .delete()
      .then(() => console.log("profile deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("education")
      .doc(id)
      .delete()
      .then(() => console.log("education deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("project")
      .doc(id)
      .delete()
      .then(() => console.log("project deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("position")
      .doc(id)
      .delete()
      .then(() => console.log("position deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("award")
      .doc(id)
      .delete()
      .then(() => console.log("award deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("hobby")
      .doc(id)
      .delete()
      .then(() => console.log("hobby deleted"))
      .catch(err => console.log(err));
    firestore
      .collection("cvs")
      .doc(id)
      .delete()
      .then(() => {
        console.log("cv deleted");
        firestore
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
                createdAt: cv.createdAt
              };
              this.props.addCv(newCv);
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
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <div>
          {this.props.cvList
            .filter(cv => cv.userId === this.props.auth.uid)
            .map(cv => {
              return (
                <div key={cv.id}>
                  <Link className="btn btn-light" to={"/" + cv.id}>
                    {cv.title}
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.handleRemoveCv(cv.id);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <Link className="btn btn-primary" to="/createcv">
          Create New Cv
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    cvList: state.cvRed.cvList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCv: newCv => {
      dispatch({ type: "ADD_CV", newCv: newCv });
    },
    removeCv: id => {
      dispatch({ type: "REMOVE_CV", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvList);
